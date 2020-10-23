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

import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import {
  CompetencyObjective,
  Project,
  Status,
  Step,
} from '../../constants/model/project.model'
import { FormFive } from '../../constants/model/step-forms.model'

import { skip } from 'rxjs/operators'
import { StepButtonSubmitConfig } from 'src/app/common-shared/constants/data/form-elements.data'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import {
  EvaluationCriteria,
  Subject,
} from 'src/app/modules/shared/constants/model/curriculum-data.model'
import { StandardEntityService } from '../../store/entity/standard/standard-entity.service'

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
  hasStandards = true
  standardsLoading = false
  showPrimaryView = false
  showDataDependancyLoader = false
  errorSubscriptions = new SubSink()
  childModalRef: any = null
  reopenPrimaryView = false
  clearTimeout = new ClearAllSetTimeouts()
  isSecondaryViewEnabled = false
  selectedPrimaryViewData: Subject
  modalNumber: number
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>
  @ViewChild('standardsModal') standardsModal: TemplateRef<any>
  @ViewChild('dependancyModal') dependancyModal: TemplateRef<any>

  selectedStandards: Option[]

  constructor(
    public editor: EditorService,
    private modalService: BsModalService,
    private standardEntityService: StandardEntityService
  ) {}

  ngOnInit(): void {
    this.stepInIt()

    const evaluationCriteriaIds = []
    for (const subject of this.project?.subjects) {
      evaluationCriteriaIds.push(
        ...subject.evaluationCriteria.map(
          (evaluationCriteria) => evaluationCriteria.id
        )
      )
    }

    if (evaluationCriteriaIds.length > 0) {
      this.subscriptions.sink = this.standardEntityService.loading$.subscribe(
        (loading) => (this.standardsLoading = loading)
      )
      this.subscriptions.sink = this.standardEntityService
        .getWithQuery(evaluationCriteriaIds.toString())
        .subscribe((standards) => (this.hasStandards = standards.length > 0))
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout.clearAll()
    this.subscriptions.unsubscribe()
    this.errorSubscriptions.unsubscribe()
    this.editor.updateOneProjectFromCache({ error: null })
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(5)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[4]
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
    this.modalNumber = i
    this.showPrimaryView = true
    // this.isSecondaryViewEnabled = false
    this.activeTextarea = null
    this.selectedPrimaryViewData = unfreeze(subject)
    if (this.allSubjectshasCriterias) {
      this.openStandardsModal(i)
    } else {
      this.getModal(subject)
    }
  }

  changeView(showPrimaryView: boolean): void {
    this.isSecondaryViewEnabled = !showPrimaryView ? true : false
  }

  openDeleteStandardConfirmationModal(data: Subject): void {
    this.showPrimaryView = false
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
    this.showDataDependancyLoader = true
    this.removeStandard(this.deleteData)
  }

  // Delete selected criteria
  removeStandard(standardData: any): void {
    this.getRemoveContentError()
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
    this.editor.handleStepSubmit(formData, formStatus === 'DONE')
    this.handleButtonType()
  }

  confirmModal(): void {
    this.editor.redirectToStep(3)
    this.bsModalRef.hide()
  }

  declineModal(clearSecondary: boolean = false): void {
    this.bsModalRef.hide()
    this.childModalRef?.hide()
    this.showDataDependancyLoader = false
    this.showPrimaryView = false
    this.errorSubscriptions.unsubscribe()
    this.editor.updateOneProjectFromCache({ error: null })
    if (this.reopenPrimaryView) {
      this.openModalWithComponent(
        this.modalNumber,
        this.selectedPrimaryViewData
      )
      this.reopenPrimaryView = false
    }
    if (clearSecondary) {
      this.clearTimeout.add = setTimeout(() => {
        this.isSecondaryViewEnabled = false
      }, 500)
    }
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
    this.getRemoveContentError()
    this.handleSubmit()
  }

  allSubjectContainsCriteria(): boolean {
    return (
      this.project?.subjects?.filter(
        (subject) => subject.evaluationCriteria.length === 0
      ).length === 0
    )
  }

  getRemoveContentError(): void {
    this.errorSubscriptions.sink = this.editor.project$
      .pipe(skip(1))
      .subscribe((data) => {
        this.bsModalRef?.hide()
        this.clearTimeout.add = setTimeout(() => {
          if (data?.error?.type === 'STANDARD_ACTIVITY') {
            if (this.showPrimaryView) {
              this.reopenPrimaryView = true
            }
            this.bsModalRef = this.modalService.show(this.dependancyModal, {
              class: 'common-modal modal-dialog-centered',
              animated: false,
            })
          } else {
            this.reopenPrimaryView = false
            this.declineModal(true)
          }
        }, 500)
      })
  }
}
