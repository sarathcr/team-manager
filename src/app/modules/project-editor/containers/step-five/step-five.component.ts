import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'

import { EditorService } from '../../services/editor/editor.service'

import { Option } from 'src/app/shared/constants/model/form-elements.model'
import {
  CompetencyObjective,
  EvaluationCriteria,
  Project,
  Status,
  Step,
  Subject,
} from '../../constants/model/project.model'
import { FormFive } from '../../constants/model/step-forms.model'

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
  activeEditableLists: number[] = []
  activeTextarea: number
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

  // Adds custom standard
  textareaDataChange(values: any, index: number): void {
    this.project.competencyObjectives[index].customStandards = [...values]
    this.checkFormEmpty()
    this.handleSubmit()
  }
  // Edit custom standard
  textItemEdit(values: any, index: number): void {
    this.project.competencyObjectives[index].customStandards = [...values]
    this.checkFormEmpty()
    this.handleSubmit()
  }

  // Delete custom standard
  textItemDelete(values: any, index: number): void {
    this.project.competencyObjectives[index].customStandards = [...values]
    this.isFormUpdated = true
    this.checkFormEmpty()
  }

  updateEditableListStatus(id: number): void {
    const tempList = new Set(this.activeEditableLists)
    tempList.add(id)
    this.activeEditableLists = Array.from(tempList)
    this.activeTextarea = id
  }

  openModalWithComponent(i: number, subject: Subject): void {
    this.activeTextarea = null
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
      class: 'common-modal modal-dialog-centered',
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
    let hasStandard = false
    for (const subject of this.project.competencyObjectives) {
      if (subject.standards?.length || subject.customStandards?.length) {
        hasStandard = true
      }
    }
    this.step.state = hasStandard ? 'INPROCESS' : 'PENDING'
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
    return [...competencyObjectivesPayload]
  }

  // function to submit form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.activeTextarea = null
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
