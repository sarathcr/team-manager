import { Component, OnInit, OnDestroy } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { FormSevenInitData } from '../../constants/step-forms.data'
import { FormSevenInit, FormSeven } from '../../constants/step-forms.model'
import { Step, Status } from '../../constants/step.model'
import { FieldConfig } from 'src/app/shared/constants/field.model'
import { DrivingQuestion } from 'src/app/modules/project-editor/constants/project.model'
import { EditorService } from '../../services/editor/editor.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'
import { Option } from './../../../../shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.scss']
})
export class StepSevenComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  drivingQuestions$: Observable<DrivingQuestion[]>
  initialFormData: FormSevenInit = new FormSevenInitData()
  inputFormData: FormSevenInit = new FormSevenInitData()
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  formTitle: string
  formDescription: string
  formPlaceholder: string
  active = false
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()

  constructor(
    private translateService: TranslateService,
    private editor: EditorService,
    private stepStatusService: StepStatusEntityService
  ) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.formInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  createFormConfig(): void {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'drivingQuestions',
      id: 'drivingQuestions',
      maxLength: 150,
      limit: 0
    }
    // Translation
    this.subscriptions.sink = this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'DRIVING_QUESTIONS.project_drivingquestions_title',
      'DRIVING_QUESTIONS.project_drivingquestions_description',
      'DRIVING_QUESTIONS.project_drivingquestions_placeholder'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
      this.textAreaConfig.placeholder = translations['DRIVING_QUESTIONS.project_drivingquestions_placeholder']
    })
  }

  formInIt(): void {
    this.project$ = this.editor.getStepData(7)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[6]
    const tempinitialFormData = new FormSevenInitData()
    if (this.project$) {
      this.drivingQuestions$ = this.project$.pipe(map(data => data?.drivingQuestions))
      this.subscriptions.sink = this.drivingQuestions$.subscribe(drivingQuestions => {
        this.initialFormData.drivingQuestions = []
        if (drivingQuestions) {
          tempinitialFormData.drivingQuestions = [...drivingQuestions]
          this.inputFormData.drivingQuestions = [...drivingQuestions]
        }
        this.initialFormData.drivingQuestions = [...tempinitialFormData.drivingQuestions]
      })
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE'
            this.initialFormStatus = formStatus.state
            if (formStatus.state !== 'DONE' && this.checkNonEmptyForm()) {
              this.buttonConfig.disabled = false
            }
          }
        }
      )
    }
  }

  // Function to check status of step
  checkStatus(): void {
    if (this.checkEmptyForm()) {
      this.step.state = 'PENDING'
    }
    else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  // checks if the form is empty
  checkEmptyForm(): boolean {
    if (!this.inputFormData.drivingQuestions.length) {
      return true
    } else {
      const tempData = this.inputFormData.drivingQuestions.filter(item => item.name != null && item.name.length && item)
      if (!tempData.length) {
        return true
      }
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm(): boolean {
    if (this.inputFormData.drivingQuestions.length &&
      (this.inputFormData.drivingQuestions[this.inputFormData.drivingQuestions.length - 1].name != null)) {
      return true
    }
    return false
  }

  // Function to check whether the form is updated
  isFormUpdated(): boolean {
    if (!this.isEqual(this.initialFormData.drivingQuestions, this.inputFormData.drivingQuestions) ||
      this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

  isEqual(d1: any[], d2: any[]): boolean {
    d1 = d1.map(item => item.name)
    d2 = d2.map(item => item.name)
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = 'DONE'
    }
    else {
      this.checkStatus()
    }
    let tempData = this.inputFormData.drivingQuestions.filter(item => item.name != null && item.name.length)
    if (tempData.length) {
      tempData = tempData.map(item => item.id == null ? { name: item.name } : item)
      this.inputFormData.drivingQuestions = tempData
      this.initialFormData.drivingQuestions = tempData
    }
    else {
      this.inputFormData.drivingQuestions = []
      this.initialFormData.drivingQuestions = this.inputFormData.drivingQuestions
    }
    const formData: FormSeven = {
      data: {
        drivingQuestions: tempData.length ? this.inputFormData.drivingQuestions : [],
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
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
    this.handleButtonType()
  }

  textAreaUpdate(data: Option[]): void { // calls on every update
    this.inputFormData.drivingQuestions = data
    this.checkStatus()
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'INPROCESS') {
      this.buttonConfig.disabled = false
      this.buttonConfig.submitted = false
    }
    if (this.step.state === 'PENDING') {
      this.buttonConfig.disabled = true
      this.buttonConfig.submitted = false
    }
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    }
  }
}
