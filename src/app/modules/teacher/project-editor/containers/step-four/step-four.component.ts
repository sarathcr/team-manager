import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'

import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map, skip, tap } from 'rxjs/operators'

import { ContentService } from '../../services/contents/contents.service'
import { EditorService } from '../../services/editor/editor.service'
import { CurriculumBasicSkillsEntityService } from '../../store/entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'

import {
  CheckBoxData,
  DropdownCustom,
  Option,
} from 'src/app/common-shared/constants/model/form-elements.model'
import { Block } from '../../constants/model/curriculum.model'
import {
  PrincipalModalColData,
  PrincipalViewLabels,
  SecondaryViewLabels,
} from '../../constants/model/principle-view.model'
import {
  BasicSkill,
  Content,
  Project,
  ProjectContent,
  Status,
  Step,
  Subject as CurriculumSubject,
} from '../../constants/model/project.model'
import { FormFour } from '../../constants/model/step-forms.model'

import { StepButtonSubmitConfig } from 'src/app/common-shared/constants/data/form-elements.data'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit, OnDestroy {
  @ViewChild('modalUnlock') modalUnlock: TemplateRef<any>
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>
  @ViewChild('principalViewModal') principalViewModal: TemplateRef<any>
  @ViewChild('dependancyModalOne') dependancyModalOne: TemplateRef<any>
  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  project: Project
  loading = true
  gradesLoading = false
  buttonConfig = new StepButtonSubmitConfig()
  subscriptions = new SubSink()
  showTextarea = false
  initialFormStatus: Status = 'PENDING'
  contents: ProjectContent[] = []
  basicSkills: BasicSkill[] = []
  selectedBasicSkills: BasicSkill[] = []
  modalRef: BsModalRef
  dataPayload: CurriculumSubject
  activeEditableLists: number[] = []
  activeTextarea: number
  hasNoBasicSkill = false
  isFormUpdated = false
  dropDownConfig: DropdownCustom
  delData: object
  labels: PrincipalViewLabels
  showBasicSkills = false
  showDataDependancyLoader = false
  errorSubscriptions = new SubSink()
  childModalRef: any = null
  showPrimaryView = false
  reopenPrimaryView = false
  selectedPrimaryViewData: CurriculumSubject

  // Modal
  modalColumns: PrincipalModalColData
  blockData: Block[]
  selectedGrades: Option[]

  constructor(
    public editor: EditorService,
    private modalService: BsModalService,
    private contentService: ContentService,
    private basicSkillsService: CurriculumBasicSkillsEntityService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.stepInit()
    this.getBasicSkills()
    this.getBlockIds()
    this.getGrades(this.project)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.errorSubscriptions.unsubscribe()
    this.editor.updateOneProjectFromCache({ error: null })
  }

  stepInit(): void {
    this.project$ = this.editor.getDataByStep(4)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
    this.subscriptions.sink = this.editor.nextLink$
      .pipe(skip(1))
      .subscribe((link) => {
        if (link && this.isFormUpdated) {
          this.editor.validatingProject = true
          this.handleSubmit()
        } else {
          this.editor.navigateToLink(false)
        }
      })
    this.subscriptions.sink = this.editor.loading$.subscribe((value) =>
      !value ? (this.loading = value) : null
    )

    const secondarViewLabels: SecondaryViewLabels = {
      selectedItemText:
        'CONTENT.project_objectives_contentwindow_content_selected',
      emptyTitle: 'CONTENT.project_content_contentwindow_empty_title',
      emptyDescription:
        'CONTENT.project_content_contentwindow_empty_description',
      emptyButtonText: 'CONTENT.project_content_contentwindow_empty_button',
    }
    this.labels = {
      subjectTitle: 'CONTENT.project_content_contentwindow_curriculum',
      summaryTitle:
        'CONTENT.project_objectives_contentwindow_content_selected_back',
      bodyTitle: 'CONTENT.project_content_contentwindow_title',
      countText: 'CONTENT.project_objectives_contentwindow_showall',
      addButtonText: 'CONTENT.project_objectives_contentwindow_add',
      secondaryViewLabels: secondarViewLabels,
    }
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe((data) => {
        this.project = data
      })
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe((formStatus) => {
        if (formStatus) {
          this.buttonConfig.submitted =
            formStatus.state === 'DONE' && !!this.project.subjects?.length
          this.initialFormStatus = formStatus.state
          if (formStatus.state !== 'DONE' && !this.hasAnyEmptyFields()) {
            this.buttonConfig.disabled = false
          }
        }
      })
    }
  }

  // Get all grades
  getGrades(project: Project): void {
    if (project.subjects?.length) {
      const criteriaIds = []
      for (const subject of this.project.subjects) {
        subject.evaluationCriteria = subject.evaluationCriteria
          ? subject.evaluationCriteria
          : []
        criteriaIds.push(
          ...subject.evaluationCriteria?.map(
            (evaluationCriteria) => evaluationCriteria.id
          )
        )
      }
      if (criteriaIds.length) {
        const params = {
          evaluationcriteriaIds: criteriaIds,
        }
        this.gradesLoading = true
        this.subscriptions.sink = this.contentService
          .getGrades(params)
          .subscribe((data) => {
            this.grades = data
            this.filterGrades()
            this.gradesLoading = false
          })
      }
    }
  }

  filterGrades(): void {
    this.selectedGrades = this.grades.filter((grade) =>
      this.project.grades.some((item) => grade.id === item.id)
    )
  }

  // Open modal and render data
  openPrincipalView(subject: CurriculumSubject): void {
    this.showPrimaryView = true
    this.selectedPrimaryViewData = unfreeze(subject)
    this.activeTextarea = null
    this.contentService.resetData()
    if (subject.evaluationCriteria.length) {
      this.getModalData(subject)
      this.modalRef = this.modalService.show(this.principalViewModal, {
        class: 'principal-modal-dialog  modal-dialog-centered',
      })
    } else {
      this.openModalUnlock()
    }
  }

  // Dropdown titles translation
  getDropDownData(): void {
    this.subscriptions.sink = this.translateService
      .stream([
        'CONTENT.project_objectives_contentwindow_combo_title',
        'CONTENT.project_objectives_contentwindow_combo_section_1',
        'CONTENT.project_objectives_contentwindow_combo_section_2',
      ])
      .subscribe((translations) => {
        this.dropDownConfig = {
          label:
            translations[
              'CONTENT.project_objectives_contentwindow_combo_title'
            ],
          priorityTitle:
            translations[
              'CONTENT.project_objectives_contentwindow_combo_section_1'
            ],
          normalTitle:
            translations[
              'CONTENT.project_objectives_contentwindow_combo_section_2'
            ],
        }
      })
  }

  // Modal submit click
  handleModalSubmit(event: any): void {
    const subject = event.subject
    const selectedItems = event.selectedItem
    this.dataPayload = {
      contents: selectedItems,
      id: subject.id,
      name: subject.name,
    }
    this.checkStepStatus(selectedItems)
    this.getRemoveContentError()
    this.handleSubmit()
  }

  // Get related blocks
  getBlocksFromGrades(): void {
    const selectedGrade = this.selectedGrades.length
      ? this.selectedGrades[0]
      : this.grades[0]
    this.contentService.selectedGrades = this.selectedGrades
    this.contentService.getBlocks(selectedGrade)
  }

  getBlockIds(): number[] {
    const blockIds: any = new Set() // Using set to avoid duplication of block ids
    for (const subject of this.project?.subjects) {
      for (const criteria of subject.evaluationCriteria) {
        blockIds.add(criteria.blockid)
      }
    }
    return Array.from(blockIds) // converting set to array
  }

  // Get modal data
  getModalData(subject: CurriculumSubject): void {
    this.contentService.grades = this.grades
    const gradeIds = this.grades.map(({ id }) => id)
    this.contentService.gradeIds = gradeIds
    this.contentService.blockIds = this.getBlockIds()
    this.contentService.heading = {
      contents: 'CONTENT.project_objectives_contentwindow_content',
      course: 'CONTENT.project_objectives_contentwindow_course',
      block: 'CONTENT.project_objectives_contentwindow_block',
    }
    this.contentService.subject = { id: subject.id, name: subject.name }
    this.contentService.contentIds = subject.contents.map(
      (content) => content.id
    )
    this.contentService.getHeading()
    this.getBlocksFromGrades()
    this.getDropDownData()
    this.modalColumns = this.contentService.modalColumns
    this.blockData = this.contentService.blockData
  }

  // Delete selected criteria
  deleteContent(contentData: any): void {
    this.getRemoveContentError()
    this.project.basicSkills = this.selectedBasicSkills
    this.checkFormEmpty()
    const formData: FormFour = {
      data: {
        ...this.project,
        updateType: 'removeContent',
        contentId: contentData.id,
        subjectId: contentData.subjectId,
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid,
          },
        ],
      },
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
    for (const subject of this.project.subjects) {
      if (subject.customContents.length) {
        contentLength.push(true)
      }
    }
    if (this.basicSkills.length && this.selectedBasicSkills.length) {
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
      class: 'common-modal modal-dialog-centered',
    })
  }

  // Open Modal for delete
  openModalDelete(data: { subjectId: number; id: number }): void {
    this.delData = data
    this.modalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered',
    })
  }

  // Decline Modal for both Unlock and delete
  declineModal(): void {
    this.modalRef.hide()
    this.childModalRef?.hide()
    this.showDataDependancyLoader = false
    this.showPrimaryView = false
    this.errorSubscriptions.unsubscribe()
    this.editor.updateOneProjectFromCache({ error: null })
    if (this.reopenPrimaryView) {
      this.openPrincipalView(this.selectedPrimaryViewData)
      this.reopenPrimaryView = false
    }
  }

  // Confirm Modal for Unlock
  confirmModalUnlock(): void {
    this.editor.redirectToStep(3)
    this.modalRef.hide()
  }

  // Confirm Modal for Delete
  confirmModalDelete(): void {
    this.showDataDependancyLoader = true
    this.deleteContent(this.delData)
  }

  textareaDataChange(values: any, index: number): void {
    this.project.subjects[index].customContents = [...values]
    this.checkFormEmpty()
    this.handleSubmit()
  }

  // Edit List Item
  textItemEdit(values: any, index: number): void {
    this.project.subjects[index].customContents = [...values]
    this.checkFormEmpty()
    this.handleSubmit()
  }

  // Delete list Item
  textItemDelete(values: any, index: number): void {
    this.project.subjects[index].customContents = [...values]
    this.isFormUpdated = true
    this.checkFormEmpty()
    this.getRemoveContentError()
    this.handleSubmit()
  }

  onCustomContentDeleteStart(childModelRef: any): void {
    this.showDataDependancyLoader = true
    this.childModalRef = childModelRef
  }
  onCustomContentyDeleteDeclined(childModelRef: any): void {
    childModelRef?.hide()
    this.declineModal()
  }

  updateEditableListStatus(id: number): void {
    const tempList = new Set(this.activeEditableLists)
    tempList.add(id)
    this.activeEditableLists = Array.from(tempList)
    this.activeTextarea = id
  }

  // Basic skills area
  getBasicSkills(): void {
    if (this.project.subjects?.length) {
      const checkData: CheckBoxData = { checked: false }
      const curriculumId = this.project.curriculumId
      if (this.project?.basicSkills?.length) {
        this.selectedBasicSkills = [...this.project.basicSkills]
      } else {
        this.selectedBasicSkills = []
      }
      this.subscriptions.sink = this.basicSkillsService.entities$
        .pipe(
          map((data) => {
            let curriculumData = data.find(
              (basicSkills) => basicSkills.id === curriculumId
            )
            if (curriculumData) {
              curriculumData = {
                id: curriculumData.id,
                name: curriculumData.name,
                basicSkills: curriculumData.basicSkills.map(
                  ({ id, code, description, name }) => ({
                    id,
                    code,
                    description,
                    name,
                  })
                ),
                showBasicskill: curriculumData.showBasicskill,
              }
            }
            return curriculumData
          }),
          tap((data) => {
            this.showBasicSkills = data?.showBasicskill
          })
        )
        .subscribe((data) => {
          if (!data && this.project) {
            this.basicSkillsService.getWithQuery(curriculumId.toString())
          } else {
            for (const basicSkill of data.basicSkills) {
              basicSkill.checkData = { ...checkData }
              for (const selectedSkill of this.selectedBasicSkills) {
                if (basicSkill.id === selectedSkill.id) {
                  basicSkill.checkData.checked = true
                }
              }
            }
            this.basicSkills = [...data.basicSkills]
          }
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
    let hasCustomContents = false
    let hasSelectedSkills = false
    for (const subjects of this.project.subjects) {
      if (subjects?.customContents?.length) {
        hasCustomContents = true
      }
    }
    if (this.basicSkills.length) {
      for (const skills of this.basicSkills) {
        if (skills.checkData.checked === true) {
          hasSelectedSkills = true
        }
      }
    }
    if (hasContents || hasCustomContents || hasSelectedSkills) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  // Check for empty fields
  hasAnyEmptyFields(): boolean {
    let hasEmptyField = false
    for (const subject of this.project.subjects) {
      if (!subject.contents?.length && !subject.customContents?.length) {
        hasEmptyField = true
      }
    }
    if (this.showBasicSkills && this.basicSkills?.length) {
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
      this.dataPayload = null
    }
    return [...subjectPayload]
  }

  getRemoveContentError(): void {
    this.errorSubscriptions.sink = this.editor.project$
      .pipe(skip(1))
      .subscribe((data) => {
        this.modalRef?.hide()
        if (data?.error?.type === 'CONTENT_ACTIVITY') {
          if (this.showPrimaryView) {
            this.reopenPrimaryView = true
          }
          this.modalRef = this.modalService.show(this.dependancyModalOne, {
            class: 'common-modal modal-dialog-centered',
            animated: false,
          })
        } else {
          this.reopenPrimaryView = false
          this.declineModal()
        }
      })
  }

  // function to submit form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.activeTextarea = null
    }
    const formData: FormFour = {
      data: {
        subjects: this.createSubjectPayload(),
        basicSkills: this.selectedBasicSkills,
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid,
          },
        ],
      },
    }
    this.isFormUpdated = false
    this.editor.handleStepSubmit(formData, formStatus === 'DONE')
    this.handleButtonType()
  }
}
