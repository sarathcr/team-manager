import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core'

import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { EditorService } from '../../services/editor/editor.service'
import { ContentService } from '../../services/contents/contents.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import {
  CurriculumBasicSkillsEntityService
} from '../../store/entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'
import { PrincipalViewComponent } from '../../components/principal-view/principal-view.component'

import {
  Project,
  Subject,
  Step,
  Status,
  BasicSkill,
  ProjectContent,
  Content
} from '../../constants/model/project.model'
import { Option, FieldConfig, CheckBoxData, FieldEvent } from 'src/app/shared/constants/model/form-config.model'
import { FormFour, FormFourInit } from '../../constants/model/step-forms.model'

import { FormFourInitData } from '../../constants/Data/step-forms.data'
import { ButtonSubmitConfig } from 'src/app/shared/constants/data/form-config.data'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit, OnDestroy {
  @ViewChild('infoModal') infoModal: TemplateRef<any>
  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  project: Project
  loading = true
  buttonConfig = new ButtonSubmitConfig()
  subscriptions = new SubSink()
  showTextarea = false
  initialFormStatus: Status = 'PENDING'
  inputFormData: FormFourInit = new FormFourInitData()
  contents: ProjectContent[] = []
  basicSkills: BasicSkill[] = []
  selectedBasicSkills: BasicSkill[] = []
  bsModalRef: BsModalRef
  dataPayload: Subject
  subjectTextArea: any[] = []
  hasNoBasicSkill = false
  isFormUpdated = false

  constructor(
    public editor: EditorService,
    private modalService: BsModalService,
    private contentService: ContentService,
    private gradeService: GradeEntityService,
    private basicSkillsService: CurriculumBasicSkillsEntityService
  ) { }

  ngOnInit(): void {
    this.stepInit()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated) {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  stepInit(): void {
    this.project$ = this.editor.getDataByStep(4)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        this.project = data
        this.subjectTextArea = []
        if (this.project?.subjects?.length) {
          this.project.subjects.forEach(subject => {
            const customContents = subject?.customContents || []
            this.subjectTextArea.push({
              data: [...customContents],
              options$: new BehaviorSubject([...customContents]),
              id: subject.id
            })
          })
        }
        this.getGrades(this.project)
        this.getBasicSkills()
      })
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE' && !!this.project.subjects?.length
            this.initialFormStatus = formStatus.state
            if (formStatus.state !== 'DONE' && !this.hasAnyEmptyFields()) {
              this.buttonConfig.disabled = false
            }
          }
        }
      )
    }
  }

  getGrades(project: Project): void {
    if (this.project?.subjects?.length) {
      this.subscriptions.sink = this.gradeService.entities$
        .pipe(
          map(grades => grades.filter(grade => grade.academicYear?.id === project.academicYear.id
            && grade.region?.id === project.region.id))
        )
        .subscribe(newData => {
          if (!newData?.length) {
            const parms = {
              regionId: project.region.id.toString(),
              academicyearId: project.academicYear.id.toString()
            }
            this.gradeService.getWithQuery(parms)
          }
          this.grades = newData.map(({ id, name }) => ({ id, name }))
        })
    }
  }

  openModalWithComponent(hasCriteria: boolean, index: number): void {
    this.contentService.resetData()
    if (hasCriteria) {
      const subject = this.project.subjects[index]
      this.getModalData(subject)
      const initialState = {
        grades: this.grades,
        stepId: 4
      }
      this.bsModalRef = this.modalService.show(PrincipalViewComponent,
        { class: 'competency-modal modal-dialog-centered', initialState })
      this.bsModalRef.content.closeBtnName = 'Close'
      this.bsModalRef.content.selectedItems.subscribe(contents => {
        this.dataPayload = {
          contents,
          id: subject.id,
          name: subject.name
        }
        this.checkStepStatus(contents)
        this.handleSubmit()
      })
    }
    else {
      this.getModal()
    }
  }

  getBlocksFromSelectedGrades(): void {
    const selectedGrades = this.project.grades.map(({ id, name }) => ({ id, name }))
    this.contentService.getBlocks(selectedGrades[0])
    this.contentService.selectedGrades = selectedGrades
  }

  getModalData(subject: Subject): void {
    const gradeIds = this.grades.map(({ id }) => id)
    this.contentService.gradeIds = gradeIds
    this.contentService.subject = { id: subject.id, name: subject.name }
    this.contentService.contentIds = subject.contents.map(content => content.id)
    this.contentService.getTranslationText()
    this.contentService.getHeading()
    this.getBlocksFromSelectedGrades()
    this.contentService.getDropDownData()
  }

  // Delete selected criteria
  deleteContent(contentData: any): void {
    for (const subject of this.project.subjects) {
      if (subject.id === contentData.subjectId) {
        for (const [index, content] of subject.contents.entries()) {
          if (content.id === contentData.id) {
            subject.contents.splice(index, 1)
          }
        }
      }
    }
    for (const [index, manualContent] of this.subjectTextArea.entries()) {
      const tempData = manualContent?.data?.map(item => item.id == null ? { name: item.name } : item)
      this.project.subjects[index].customContents = tempData
    }
    this.project.basicSkills = this.selectedBasicSkills
    this.checkFormEmpty()
    const formData: FormFour = {
      data: {
        ...this.project,
        updateType: 'removeContent',
        contentId: contentData.id,
        subjectId: contentData.subjectId
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid
          }
        ]
      }
    }
    this.editor.handleStepSubmit(formData)
  }

  checkFormEmpty(): void {
    const contentLength = []
    for (const subject of this.project.subjects) {
      if (subject.contents.length) {
        contentLength.push(true)
      }
    }
    for (const customContent of this.subjectTextArea) {
      if (customContent.data.length) {
        contentLength.push(true)
      }
    }
    if (this.basicSkills?.length && this.selectedBasicSkills?.length) {
      contentLength.push(true)
    }
    if (!contentLength.length) {
      this.step.state = 'PENDING'
    } else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  getModal(): void {
    this.bsModalRef = this.modalService.show(this.infoModal, {
      class: 'common-modal modal-dialog-centered'
    })
  }

  declineModal(): void {
    this.bsModalRef.hide()
  }

  confirmModal(): void {
    this.editor.redirectToStep(3)
    this.bsModalRef.hide()
  }

  textareaDataChange(data: FieldEvent, index: number): void {
    this.subjectTextArea[index].data = [...data.val]
    this.isFormUpdated = data.updated
    if (data.updated) {
      this.checkStepStatus()
    }
  }

  // Basic skills area
  getBasicSkills(): void {
    if (this.project.subjects?.length) {
      const checkData: CheckBoxData = { checked: false, variant: 'checkedOnly' }
      this.selectedBasicSkills = [...this.project.basicSkills]
      this.subscriptions.sink = this.basicSkillsService.entities$
        .pipe(
          map(data => {
            const basicSkills = []
            for (const curriculum of data) {
              for (const { id, code, description, name } of curriculum.basicSkills) {
                basicSkills.push({ id, code, description, name })
              }
            }
            return basicSkills
          }))
        .subscribe(basicSkills => {
          if (!basicSkills.length && this.project) {
            const parms = {
              regionId: this.project.region.id.toString(),
              academicyearId: this.project.academicYear.id.toString()
            }
            this.basicSkillsService.getWithQuery(parms)
          }
          basicSkills.forEach(basicSkill => {
            basicSkill.checkData = { ...checkData }
            this.selectedBasicSkills.forEach(selectedSkill => {
              if (basicSkill.id === selectedSkill.id) {
                basicSkill.checkData.checked = true
              }
            })
          })
          this.basicSkills = [...basicSkills]
        })
    }
  }

  handleSkillSelect(): void {
    this.selectedBasicSkills = []
    for (const skill of this.basicSkills) {
      if (skill.checkData.checked === true) {
        this.selectedBasicSkills.push({ id: skill.id, name: skill.name })
      }
    }
    this.checkStepStatus()
    this.isFormUpdated = true
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    } else {
      if (this.hasAnyEmptyFields()) {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = false
      } else {
        this.buttonConfig.disabled = false
        this.buttonConfig.submitted = false
      }
    }
  }

  checkStepStatus(contents?: Content[]): void {
    const hasContents = !!contents?.length
    let hasManualContents = false
    let hasSelectedSkills = false
    for (const manualContents of this.subjectTextArea) {
      if (manualContents?.data?.length) {
        hasManualContents = true
      }
    }
    if (this.basicSkills?.length) {
      for (const skills of this.basicSkills) {
        if (skills.checkData.checked === true) {
          hasSelectedSkills = true
        }
      }
    }
    if (hasContents || hasManualContents || hasSelectedSkills) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  hasAnyEmptyFields(): boolean {
    let hasEmptyField = false
    for (const subject of this.project.subjects) {
      for (const textArea of this.subjectTextArea) {
        if (!subject.contents?.length && !textArea.data?.length) {
          hasEmptyField = true
        }
      }
    }
    if (this.basicSkills?.length) {
      const checkedArray = []
      for (const basicSkill of this.basicSkills) {
        checkedArray.push(basicSkill.checkData.checked)
      }
      if (!checkedArray.includes(true)) {
        hasEmptyField = true
      }
    }
    return hasEmptyField
  }

  // Create subject
  createSubjectPayload(): Subject[] {
    const subjectPayload = [...this.project.subjects]
    if (this.dataPayload) {
      for (const subject of subjectPayload) {
        if (subject.id === this.dataPayload.id) {
          subject.contents = this.dataPayload.contents
        }
      }
    }
    for (const [index, manualContent] of this.subjectTextArea.entries()) {
      const tempData = manualContent?.data?.map(item => item.id == null ? { name: item.name } : item)
      subjectPayload[index].customContents = tempData
    }
    return [...subjectPayload]
  }

  // function to submit form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = 'DONE'
    }
    const formData: FormFour = {
      data: {
        subjects: this.createSubjectPayload(),
        basicSkills: this.selectedBasicSkills
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid
          }
        ]
      }
    }
    this.isFormUpdated = false
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
    this.handleButtonType()
  }
}
