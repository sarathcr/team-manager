import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EditorService } from '../../services/editor/editor.service'

import { SubSink } from '../../../../shared/utility/subsink.utility'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { EvaluationCriteriaEntityService } from '../../store/entity/evaluation-criteria/evaluation-criteria-entity.service'
import { TranslateService } from '@ngx-translate/core'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import { Project, Step, EvaluationCriteria, CompetencyObjective, Status, Subject } from '../../constants/model/project.model'
import { FieldConfig, Option } from 'src/app/shared/constants/model/form-config.model'
import { FormThreeInit, FormThree } from '../../constants/model/step-forms.model'
import { FormThreeInitData } from '../../constants/Data/step-forms.data'

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  competencyObjectives$: Observable<CompetencyObjective[]>
  evaluationCriteria$: Observable<EvaluationCriteria[]>
  loading = true
  inputFormData: FormThreeInit = new FormThreeInitData()
  initialFormData: FormThreeInit = new FormThreeInitData()
  project: Project
  initialFormStatus: Status = 'PENDING'
  bsModalRef: BsModalRef
  subscriptions = new SubSink()
  criteriaPayload: Subject
  isFormUpdated = false

  constructor(
    private editor: EditorService,
    private translateService: TranslateService,
    private modalService: BsModalService,
    private gradeService: GradeEntityService,
    private criteriaEntityService: EvaluationCriteriaEntityService) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.stepInIt()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(5)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        if (data) {
          this.project = data
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

  createFormConfig(): void {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA'
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'competencyObjectives',
      id: 'competencyObjectives',
      maxLength: 150,
      limit: 0
    }

    // Translation
    this.subscriptions.sink = this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'OBJECTIVES.project_objectives_title',
      'OBJECTIVES.project_objectives_description',
      'OBJECTIVES.project_objectives_objectives_placeholder'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
      this.textAreaConfig.placeholder = translations['OBJECTIVES.project_objectives_objectives_placeholder']
    })
  }

  openModalWithComponent(subject: Subject): void {

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
    if (!this.checkEmptyCriteria() || !this.inputFormData.competencyObjectives?.length) {
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
  createSubjectPayload(): Subject[] {
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
    const tempData = this.inputFormData.competencyObjectives.map(item => item.id == null ? { name: item.name } : item)
    this.inputFormData.competencyObjectives = tempData
    this.initialFormData.competencyObjectives = tempData
    const formData: FormThree = {
      data: {
        subjects: this.createSubjectPayload(),
        competencyObjectives: this.inputFormData.competencyObjectives,
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
