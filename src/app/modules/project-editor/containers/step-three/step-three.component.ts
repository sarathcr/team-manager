import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core'

import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { EditorService } from '../../services/editor/editor.service'
import { ObjectiveService } from '../../services/objectives/objectives.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import { EvaluationCriteriaEntityService } from '../../store/entity/evaluation-criteria/evaluation-criteria-entity.service'

import { Option, FieldEvent, DropdownCustom } from 'src/app/shared/constants/model/form-elements.model'
import {
  CompetencyObjective,
  EvaluationCriteria,
  Subject as CurriculumSubject,
  Step,
  Status,
  Project,
} from 'src/app/modules/project-editor/constants/model/project.model'
import { FormThree } from '../../constants/model/step-forms.model'
import { PrincipalModalColData } from '../../constants/model/principle-view.model'
import { Block } from '../../constants/model/curriculum.model'

import { ButtonSubmitConfig } from 'src/app/shared/constants/data/form-elements.data'
import { SubSink } from 'src/app/shared/utility/subsink.utility'


@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit, OnDestroy, AfterViewInit {

  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  buttonConfig = new ButtonSubmitConfig()
  competencyObjectives$: Observable<CompetencyObjective[]>
  evaluationCriteria$: Observable<EvaluationCriteria[]>
  loading = true
  competencyObjectives: CompetencyObjective[] = []
  project: Project
  initialFormStatus: Status = 'PENDING'
  modalRef: BsModalRef
  subscriptions = new SubSink()
  criteriaPayload: CurriculumSubject
  isFormUpdated = false
  criteriaLoader = false
  data: object
  dropDownConfig: DropdownCustom
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>
  @ViewChild('principalViewModal') principalViewModal: TemplateRef<any>

  // Modal
  modalColumns: PrincipalModalColData
  blockData: Block[]
  currentBlockIndex = 0
  selectedGrades: Option[]

  constructor(
    public editor: EditorService,
    private modalService: BsModalService,
    private gradeService: GradeEntityService,
    private criteriaEntityService: EvaluationCriteriaEntityService,
    private objective: ObjectiveService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.stepInIt()
  }

  ngAfterViewInit(): void {
    this.getGrades(this.project)
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated && this.step.state !== 'DONE') {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(3)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[2]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        if (data) {
          this.project = data
          if (data.subjects?.length) {
            this.getCriteriaDetails(this.project.subjects)
          }
          this.getGrades(this.project)
        }
      })
      this.competencyObjectives$ = this.project$
        .pipe(
          map(data => data?.competencyObjectives)
        )
      this.subscriptions.sink = this.competencyObjectives$
        .subscribe(competencyObjectives => {
          if (competencyObjectives) {
            this.competencyObjectives = [...competencyObjectives]
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
          this.selectedGrades = this.objective.selectedGrades
        })
    }
  }

  // gets the criteria data
  getCriteriaDetails(subjects: CurriculumSubject[]): void {
    this.criteriaEntityService.loading$.subscribe(loading => this.criteriaLoader = loading)
    const criteriaIds = []
    for (const subject of subjects) {
      if (subject.evaluationCriteria?.length) {
        for (const criteria of subject.evaluationCriteria) {
          criteriaIds.push(criteria.id)
        }
      }
    }
    if (criteriaIds.length) {
      this.subscriptions.sink = this.criteriaEntityService.entities$.pipe(map(details => {
        let idNotFound = false
        if (details?.length) {
          const detailIds = details.map(detail => detail.id)
          for (const criteriaId of criteriaIds) {
            if (!detailIds.includes(criteriaId)) {
              idNotFound = true
            }
          }
        }
        return idNotFound ? null : details
      }))
        .subscribe(data => {
          if (!data?.length) {
            this.criteriaEntityService.getWithQuery(criteriaIds.toString())
          } else {
            this.addCriteriaDetails(data)
          }
        }
        )
    }
  }

  // Adds dimension or basic skills to the evaluation criteria
  addCriteriaDetails(criteriaDetails: any): void {
    for (const subject of this.project.subjects) {
      for (const criteria of subject.evaluationCriteria) {
        criteriaDetails.find(detail => {
          if (detail.id === criteria.id) {
            if (detail.dimensions?.length) {
              criteria.dimensions = [...detail.dimensions]
            } else {
              criteria.basicSkills = [...detail.basicSkills]
            }
          }
        })
      }
    }
  }

  // Delete selected criteria
  removeCriteria(criteriaData: any): void {
    for (const subject of this.project.subjects) {
      if (subject.id === criteriaData.subjectId) {
        for (const [index, criteria] of subject.evaluationCriteria.entries()) {
          if (criteria.id === criteriaData.id) {
            subject.evaluationCriteria.splice(index, 1)
          }
        }
      }
    }
    this.project.competencyObjectives = [...this.competencyObjectives]
    this.checkFormEmpty()
    const formData: FormThree = {
      data: {
        ...this.project,
        updateType: 'removeCriteria',
        criteriaId: criteriaData.id,
        subjectId: criteriaData.subjectId
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

  // Checks whether the form is empty
  checkFormEmpty(): void {
    const isCriteriaLength = []
    for (const subject of this.project.subjects) {
      if (subject.evaluationCriteria?.length) {
        isCriteriaLength.push(true)
      }
    }
    if (!isCriteriaLength.length && !this.competencyObjectives?.length) {
      this.step.state = 'PENDING'
    } else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  textAreaUpdate(data: FieldEvent): void { // calls on every update
    this.competencyObjectives = data.values
    this.isFormUpdated = data.updated
    if (data.updated) {
      this.checkStepStatus()
    }
  }

  // checks current form status
  checkStepStatus(criterias?: EvaluationCriteria[]): void {
    if (criterias?.length || this.checkEmptyCriteria() || this.competencyObjectives?.length) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  checkEmptyCriteria(): boolean {
    let nonEmptyForm = true
    for (const subject of this.project.subjects) {
      if (!subject.evaluationCriteria?.length) {
        nonEmptyForm = false
      }
    }
    return nonEmptyForm
  }

  // checks the form is completely filled or not
  hasAnyEmptyFields(): boolean {
    if (!this.checkEmptyCriteria() || !this.competencyObjectives?.length) {
      return true
    }
    return false
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

  // Create subject
  createSubjectPayload(): CurriculumSubject[] {
    const subjectPayload = [...this.project.subjects]
    if (this.criteriaPayload) {
      for (const subject of subjectPayload) {
        if (subject.id === this.criteriaPayload.id) {
          subject.evaluationCriteria = [...this.criteriaPayload.evaluationCriteria]
        }
      }
    }
    this.criteriaPayload = null // To clear criteria payload
    return [...subjectPayload]
  }

  // function to submit form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = 'DONE'
    }
    const tempData = this.competencyObjectives.map(item => item.id == null ? { name: item.name } : item)
    this.competencyObjectives = tempData
    const formData: FormThree = {
      data: {
        subjects: this.createSubjectPayload(),
        competencyObjectives: this.competencyObjectives,
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

  getBlocksFromSelectedGrades(): void {
    this.selectedGrades = this.project.grades.map(({ id, name }) => ({ id, name }))
    this.objective.getBlocks(this.selectedGrades[0])
    this.objective.selectedGrades = this.selectedGrades
  }

  getModalData(subject: CurriculumSubject): void {
    this.objective.grades = this.grades
    this.objective.heading = {
      evaluationCriteria: 'OBJECTIVES.project_objectives_criteriawindow_criterion',
      basicSkills: 'OBJECTIVES.project_objectives_criteriawindow_basic_skills',
      course: 'OBJECTIVES.project_objectives_criteriawindow_grade',
      block: 'OBJECTIVES.project_objectives_criteriawindow_block',
      dimension: 'OBJECTIVES.project_objectives_criteriawindow_dimensions'
    }
    const gradeIds = this.grades.map(({ id }) => id)
    this.objective.gradeIds = gradeIds
    this.objective.subject = { id: subject.id, name: subject.name }
    this.objective.criteriaIds = subject.evaluationCriteria.map(criteria => criteria.id)
    this.objective.getHeading()
    this.getBlocksFromSelectedGrades()
    this.getDropDownData()
    this.modalColumns = this.objective.modalColumns
    this.blockData = this.objective.blockData
  }

  getDropDownData(): void {
    this.subscriptions.sink = this.translateService.stream([
      'OBJECTIVES.project_objectives_criteriawindow_combo_title',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_1',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_2',
    ]).subscribe(translations => {
      this.dropDownConfig = {
        label: translations['OBJECTIVES.project_objectives_criteriawindow_combo_title'],
        priorityTitle: translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_1'],
        normalTitle: translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_2']
      }
    })
  }

  // function to open principle view modal
  openPrincipalView(subject: CurriculumSubject): void {
    this.objective.resetData()
    this.getModalData(subject)
    this.modalRef = this.modalService.show( this.principalViewModal,
      { class: 'competency-modal modal-dialog-centered', ignoreBackdropClick: true })
  }

  openModal(data: object): void {
    this.data = data
    this.modalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered'
    })
  }

  declineModal(): void {
    this.modalRef.hide()
  }

  confirmModal(): void {
    this.removeCriteria(this.data)
    this.modalRef.hide()
  }
  // Modal submit click
  handleModalSubmit(event: any): void{
    const subject = event.subject
    const selectedItems = event.selectedItem
    this.modalRef.hide()
    this.criteriaPayload = {
      evaluationCriteria: selectedItems,
      id: subject.id,
      name: subject.name
    }
    this.checkStepStatus(selectedItems)
    this.handleSubmit()
  }
}

