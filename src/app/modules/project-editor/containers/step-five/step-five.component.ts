import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core'

import { Observable, BehaviorSubject } from 'rxjs'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

import { EditorService } from '../../services/editor/editor.service'
import { StandardEntityService } from '../../store/entity/standard/standard-entity.service'

import {
  FieldEvent,
  Option,
} from 'src/app/shared/constants/model/form-elements.model'
import { FormFive } from '../../constants/model/step-forms.model'
import {
  Project,
  Step,
  EvaluationCriteria,
  CompetencyObjective,
  Status,
  Subject,
  Standard,
} from '../../constants/model/project.model'

import { StepButtonSubmitConfig } from 'src/app/shared/constants/data/form-elements.data'
import { SubSink } from '../../../../shared/utility/subsink.utility'

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss'],
})
export class StepFiveComponent implements OnInit, OnDestroy {
  @ViewChild('infoModal') infoModal: TemplateRef<any>
  project$: Observable<Project>
  step$: Observable<Step>
  step: Step
  buttonConfig = new StepButtonSubmitConfig()
  competencyObjectives$: Observable<CompetencyObjective[]>
  evaluationCriteria$: Observable<EvaluationCriteria[]>
  loading = true
  competencyObjectives: CompetencyObjective[] = []
  project: Project
  initialFormStatus: Status = 'PENDING'
  bsModalRef: BsModalRef
  subscriptions = new SubSink()
  isFormUpdated = false
  deleteData: object
  subjectTextArea: any[] = []
  dataPayload: CompetencyObjective
  competencyObjectiveSelected: number
  allSubjectshasCriterias = false
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>
  @ViewChild('standardsModal') standardsModal: TemplateRef<any>

  selectedStandards: Option[]

  constructor(
    private editor: EditorService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.stepInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated && this.step.state !== 'DONE') {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  getCustomStandards(competencyObjectives: CompetencyObjective[]): void {
    this.subjectTextArea = []
    competencyObjectives.forEach((competency) => {
      const customStandard = competency?.customStandards || []
      const customStandardCopy = customStandard.map(({ id, name }) => ({
        id,
        name,
      }))
      this.subjectTextArea.push({
        data: [...customStandardCopy],
        options$: new BehaviorSubject([...customStandardCopy]),
        id: competency.id,
      })
    })
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(5)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[4]
    this.subscriptions.sink = this.editor.loading$.subscribe((value) =>
      !value ? (this.loading = value) : null
    )
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe((data) => {
        this.project = data
        this.allSubjectshasCriterias = this.allSubjectContainsCriteria()
        if (this.project?.competencyObjectives?.length) {
          this.getCustomStandards(data.competencyObjectives)
        }
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

  checkStepStatus(competencyObjectives?: CompetencyObjective[]): void {
    const hasObjectives = competencyObjectives?.length > 0
    let hasCriterias = true
    for (const subject of this.project.subjects) {
      if (subject.evaluationCriteria?.length === 0) {
        hasCriterias = false
      }
    }
    if (hasObjectives || hasCriterias) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  textareaDataChange(data: FieldEvent, index: number): void {
    this.subjectTextArea[index].data = [...data.values]
    this.project.competencyObjectives[
      index
    ].customStandards = this.subjectTextArea[index].data
    this.isFormUpdated = data.updated
    if (data.updated) {
      this.checkStepStatus(this.project.competencyObjectives)
    }
    this.checkFormEmpty()
  }

  openModalWithComponent(i: number, subject: Subject): void {
    if (this.allSubjectshasCriterias) {
      this.openStandardsModal(i)
    } else {
      this.getModal(subject)
    }
  }

  openDeleteStandardConfirmationModal(data: Subject): void {
    this.deleteData = data
    this.bsModalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered',
    })
  }

  getModal(subject: Subject): void {
    const initialState = { modalConfig: {} }
    this.bsModalRef = this.modalService.show(this.infoModal, {
      class: 'common-modal',
      initialState,
    })
  }

  openStandardsModal(i: number): void {
    this.competencyObjectiveSelected = i
    this.bsModalRef = this.modalService.show(this.standardsModal, {
      class: 'competency-modal-dialog  modal-dialog-centered',
    })
  }

  // Checks whether the form is empty
  checkFormEmpty(): void {
    const isStandardLength = []
    for (const subject of this.project.competencyObjectives) {
      if (subject.standards?.length || subject.customStandards?.length) {
        isStandardLength.push(true)
      }
    }
    if (!isStandardLength.length && !this.competencyObjectives?.length) {
      this.step.state = 'PENDING'
    } else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  confirmModalDelete(): void {
    this.removeStandard(this.deleteData)
    this.bsModalRef.hide()
  }

  // Delete selected criteria
  removeStandard(standardData: any): void {
    const competencyObjectivesCopy = [...this.project.competencyObjectives]
    for (const [
      cindex,
      competencyObjective,
    ] of competencyObjectivesCopy.entries()) {
      if (competencyObjective.id === standardData.subjectId) {
        this.project.competencyObjectives[cindex].standards = [
          ...competencyObjective.standards.filter(
            (standard) => standard.id !== standardData.id
          ),
        ]
      }
    }

    this.checkFormEmpty()
    const formData: FormFive = {
      data: {
        ...this.project,
        updateType: 'removeStandard',
        competencyObjectiveId: standardData.subjectId,
        standardId: standardData.id,
        // id: standardData.subjectId, standardId: standardData.id,
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

  checkEmptyStandards(): boolean {
    let nonEmptyForm = true
    for (const competency of this.project.competencyObjectives) {
      if (
        !competency.standards?.length &&
        !competency.customStandards?.length
      ) {
        nonEmptyForm = false
      }
    }
    return nonEmptyForm
  }

  // checks the form is completely filled or not
  hasAnyEmptyFields(): boolean {
    if (
      !this.checkEmptyStandards() ||
      this.project?.competencyObjectives?.length === 0
    ) {
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

  createCompetencyObjectivesPayload(): CompetencyObjective[] {
    const competencyObjectivesPayload = [...this.project.competencyObjectives]
    if (this.dataPayload) {
      for (const competency of competencyObjectivesPayload) {
        if (competency.id === this.dataPayload.id) {
          competency.standards = [...this.dataPayload.standards]
        }
      }
    }
    this.dataPayload = null
    for (const [index, customStandard] of this.subjectTextArea.entries()) {
      const tempData = customStandard?.data?.map((item) =>
        item.id == null ? { name: item.name } : item
      )
      competencyObjectivesPayload[index].customStandards = tempData
    }
    return [...competencyObjectivesPayload]
  }

  // function to submit form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = 'DONE'
    }
    const tempData = this.project.competencyObjectives.map((item) =>
      item.id == null ? { name: item.name } : item
    )
    this.competencyObjectives = tempData
    const formData: FormFive = {
      data: {
        competencyObjectives: this.createCompetencyObjectivesPayload(),
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
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
    this.handleButtonType()
  }

  confirmModal(): void {
    this.editor.redirectToStep(3)
    this.bsModalRef.hide()
  }

  declineModal(): void {
    this.bsModalRef.hide()
  }

  handleModalSubmit(event: any): void {
    this.project.competencyObjectives[
      this.competencyObjectiveSelected
    ].standards = event
    this.dataPayload = {
      ...this.project.competencyObjectives[this.competencyObjectiveSelected],
      standards: event,
    }
    this.step.state = 'INPROCESS'
    this.handleSubmit()
    this.bsModalRef.hide()
  }

  allSubjectContainsCriteria(): boolean {
    return (
      this.project?.subjects?.filter(
        (subject) => subject.evaluationCriteria.length === 0
      ).length === 0
    )
  }
}
