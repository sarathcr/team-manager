import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, AfterViewInit } from '@angular/core'

import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { EditorService } from '../../services/editor/editor.service'
import { ContentService } from '../../services/contents/contents.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import {
  CurriculumBasicSkillsEntityService
} from '../../store/entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'

import {
  Project,
  Step,
  Subject  as CurriculumSubject,
  Status,
  BasicSkill,
  ProjectContent,
  Content
} from '../../constants/model/project.model'
import { Option, CheckBoxData, FieldEvent, DropdownCustom } from 'src/app/shared/constants/model/form-elements.model'
import { FormFour } from '../../constants/model/step-forms.model'
import { PrincipalModalColData, ModalLabels, SecondaryViewLabels } from '../../constants/model/principle-view.model'
import { Block } from '../../constants/model/curriculum.model'

import { ButtonSubmitConfig } from 'src/app/shared/constants/data/form-elements.data'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modalUnlock') modalUnlock: TemplateRef<any>
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>
  @ViewChild('principalViewModal') principalViewModal: TemplateRef<any>
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
  contents: ProjectContent[] = []
  basicSkills: BasicSkill[] = []
  selectedBasicSkills: BasicSkill[] = []
  modalRef: BsModalRef
  dataPayload: CurriculumSubject
  subjectTextArea: any[] = []
  hasNoBasicSkill = false
  isFormUpdated = false
  dropDownConfig: DropdownCustom
  delData: object
  labels: ModalLabels

  // Modal
  modalColumns: PrincipalModalColData
  blockData: Block[]
  currentBlockIndex = 0
  selectedGrades: Option[]

  constructor(
    public editor: EditorService,
    private modalService: BsModalService,
    private contentService: ContentService,
    private gradeService: GradeEntityService,
    private basicSkillsService: CurriculumBasicSkillsEntityService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.stepInit()
  }

  ngAfterViewInit(): void {
    this.getGrades(this.project)
    this.getBasicSkills()
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
    const secondarViewLabels: SecondaryViewLabels = {
      selectedItemText: 'CONTENT.project_objectives_contentwindow_content_selected',
      emptyTitle: 'CONTENT.project_content_contentwindow_empty_title',
      emptyDescription: 'CONTENT.project_content_contentwindow_empty_description',
      emptyButtonText: 'CONTENT.project_content_contentwindow_empty_button'
    }
    this.labels = {
      subjectTitle: 'CONTENT.project_content_contentwindow_curriculum',
      summaryTitle: 'CONTENT.project_objectives_contentwindow_content_selected_back',
      bodyTitle: 'CONTENT.project_content_contentwindow_title',
      countText: 'CONTENT.project_objectives_contentwindow_showall',
      addButtonText: 'CONTENT.project_objectives_contentwindow_add',
      secondaryViewLabels: secondarViewLabels
    }
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

  // Get all grades
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
          this.selectedGrades = this.contentService.selectedGrades
        })
    }
  }

  // Open modal and render data
  openPrincipalView(subject: CurriculumSubject): void {
    this.contentService.resetData()
    if (subject.evaluationCriteria.length) {
      this.getModalData(subject)
      this.modalRef = this.modalService.show( this.principalViewModal,
        { class: 'competency-modal  modal-dialog-centered' })
    }
    else {
      this.openModalUnlock()
    }
  }

  // Dropdown titles translation
  getDropDownData(): void {
    this.subscriptions.sink = this.translateService.stream([
      'CONTENT.project_objectives_contentwindow_combo_title',
      'CONTENT.project_objectives_contentwindow_combo_section_1',
      'CONTENT.project_objectives_contentwindow_combo_section_2',
    ]).subscribe(translations => {
      this.dropDownConfig = {
        label: translations['CONTENT.project_objectives_contentwindow_combo_title'],
        priorityTitle: translations['CONTENT.project_objectives_contentwindow_combo_section_1'],
        normalTitle: translations['CONTENT.project_objectives_contentwindow_combo_section_2']
      }
    })
  }

  // Modal submit click
  handleModalSubmit(event: any): void{
    const subject = event.subject
    const selectedItems = event.selectedItem
    this.dataPayload = {
      contents: selectedItems,
      id: subject.id,
      name: subject.name
    }
    this.checkStepStatus(selectedItems)
    this.handleSubmit()
    this.modalRef.hide()
  }

  // Get related blocks
  getBlocksFromSelectedGrades(): void {
    this.selectedGrades = this.project.grades.map(({ id, name }) => ({ id, name }))
    this.contentService.getBlocks(this.selectedGrades[0])
    this.contentService.selectedGrades = this.selectedGrades
  }

  // Get modal data
  getModalData(subject: CurriculumSubject): void {
    this.contentService.grades = this.grades
    this.contentService.heading = {
      contents: 'CONTENT.project_objectives_contentwindow_content',
      course: 'CONTENT.project_objectives_contentwindow_course',
      block: 'CONTENT.project_objectives_contentwindow_block',
    }
    const gradeIds = this.grades.map(({ id }) => id)
    this.contentService.gradeIds = gradeIds
    this.contentService.subject = { id: subject.id, name: subject.name }
    this.contentService.contentIds = subject.contents.map(content => content.id)
    this.contentService.getHeading()
    this.getBlocksFromSelectedGrades()
    this.getDropDownData()
    this.modalColumns = this.contentService.modalColumns
    this.blockData = this.contentService.blockData
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

  // Check for empty data
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

  // Open Modal for unlock
  openModalUnlock(): void {
    this.modalRef = this.modalService.show(this.modalUnlock, {
      class: 'common-modal modal-dialog-centered'
    })
  }

  // Open Modal for delete
  openModalDelete(data: { subjectId: number, id: number }): void {
    this.delData = data
    this.modalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered'
    })
  }

  // Decline Modal for both Unlock and delete
  declineModal(): void {
    this.modalRef.hide()
  }

  // Confirm Modal for Unlock
  confirmModalUnlock(): void {
    this.editor.redirectToStep(3)
    this.modalRef.hide()
  }

  // Confirm Modal for Delete
  confirmModalDelete(): void {
    this.deleteContent(this.delData)
    this.modalRef.hide()
  }

  textareaDataChange(data: FieldEvent, index: number): void {
    this.subjectTextArea[index].data = [...data.values]
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

  // Update basic skills selection
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

  // Check step status
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

  // Check for empty fields
  hasAnyEmptyFields(): boolean {
    let hasEmptyField = false
    for (const [index, subject] of this.project.subjects.entries()) {
      if (!subject.contents?.length && !this.subjectTextArea[index].data?.length) {
        hasEmptyField = true
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
  createSubjectPayload(): CurriculumSubject[] {
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
