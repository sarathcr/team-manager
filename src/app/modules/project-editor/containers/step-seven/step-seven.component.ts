import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { formSevenInitData } from '../../constants/step-forms.data'
import { FormSevenInitData, FormSeven } from '../../constants/step-forms.model'
import { Step, StepId, StepState, Status } from '../../constants/step.model'
import { FieldConfig } from 'src/app/shared/constants/field.model'
import { Project } from 'src/app/shared/constants/project.model'

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.scss']
})
export class StepSevenComponent implements OnInit, OnDestroy {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() stepStatus$: Observable<StepState>
  @Input() step: Step
  initialFormData: FormSevenInitData = new formSevenInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  formTitle: string
  formDescription: string
  formPlaceholder: string
  projectId: number
  active: boolean = false
  initialFormStatus: Status

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.onScrollSubmit()
    this.formInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  createFormConfig() {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'drivingQuestions',
      id: 'drivingQuestions',
      maxLength: 150,
      options: [{id: null, name: null}],
      limit: 0
    }
    // Translation
    this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'DRIVING_QUESTIONS.project_drivingquestions_title',
      'DRIVING_QUESTIONS.project_drivingquestions_description',
      'DRIVING_QUESTIONS.project_drivingquestions_placeholder'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
      this.formPlaceholder = translations['DRIVING_QUESTIONS.project_drivingquestions_placeholder']
      this.formTitle = translations['DRIVING_QUESTIONS.project_drivingquestions_title']
      this.formDescription = translations['DRIVING_QUESTIONS.project_drivingquestions_description']
      this.textAreaConfig.placeholder = this.formPlaceholder
    })
  }

  formInIt(){
    if (this.project$)
      this.project$.subscribe(data => {
        this.projectId = data?.id
        let tempinitialFormData = new formSevenInitData
        this.initialFormData.drivingQuestions = []
        if (data?.drivingQuestions) {
          tempinitialFormData.drivingQuestions.push(...data.drivingQuestions)
          this.textAreaConfig.options = []
          this.textAreaConfig.options.push(...data.drivingQuestions)
        }
        this.initialFormData.drivingQuestions = [...tempinitialFormData.drivingQuestions]
        if(!this.textAreaConfig.options.length){
          this.textAreaConfig.options = [{ id: 1, name: null }]
        }
      })
    if (this.stepStatus$) {
      this.stepStatus$.pipe(
        map(data => data?.steps?.filter(statusData => statusData.stepid == this.step.stepid)))
        .subscribe(
          formStatus => {
            if (formStatus && formStatus.length) {
              this.buttonConfig.submitted = formStatus[0].state == "DONE"
              this.initialFormStatus = formStatus[0].state
              if (formStatus[0].state != "DONE" && this.checkNonEmptyForm())
                this.buttonConfig.disabled = false
            }
          }
        )
    }
  }

  onScrollSubmit() {
    this.spyActive$
      .subscribe(sectionId => {
        if (sectionId === this.step.sectionid && !this.active) {
          this.active = true
        }
        if (sectionId !== this.step.sectionid && this.active) {
          if (this.isFormUpdated()) {
            this.handleSubmit('INPROCESS')
            this.active = false
          } else {
            this.active = true
          }
        }
      })
  }

  // Function to check status of step
  checkStatus() {
    if (this.checkEmptyForm()) {
      this.step.state = "PENDING"
    } else {
      if (this.checkNonEmptyForm() === true) {
        this.step.state = "DONE"
      } else {
        this.step.state = "INPROCESS"
      }
    }
  }

  // checks if the form is empty
  checkEmptyForm() {
    if (!this.textAreaConfig.options.length) {
      return true
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm() {
    if (this.initialFormData.drivingQuestions.length) {
      return true
    }
    return false
  }

  // Function to check whether the form is updated
  isFormUpdated() {
    if (!this.isEqual(this.initialFormData.drivingQuestions, this.textAreaConfig.options)) {
      return true
    } else {
      return false
    }
  }

  isEqual(d1: any[], d2: any[]) {
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

  handleSubmit(formStatus?: Status) {
    this.checkStatus()
    let tempData = []
    if(formStatus){
      this.step.state = formStatus
    }
    this.textAreaConfig.options.forEach( (item, index) => {
      tempData.push({id: item.id,name: item.name})
    })
    this.textAreaConfig.options = tempData
    let formData: FormSeven = {
      data: {
        drivingQuestions:  this.textAreaConfig.options,
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
    this.onSubmit.emit(formData)
    this.buttonConfig.submitted = true
  }

  checkInProgress() {
    let values: Array<any> = []
    values.push(this.isEqual(this.initialFormData.drivingQuestions, this.textAreaConfig.options))
    if (values.includes(false)) {
      this.step.state = 'INPROCESS'
      this.buttonConfig.disabled = false
    }
    this.buttonConfig.submitted = this.step.state == 'DONE'
  }

  textAreaUpdate(data) { // calls on every update
    this.textAreaConfig.options = data
    this.checkInProgress()
  }

  // Changes the button according to form status
  handleButtonType() {
    if (this.step.state == 'INPROCESS') {
      this.buttonConfig.disabled = false
      this.buttonConfig.submitted = false
    }
    if (this.step.state == 'PENDING') {
      this.buttonConfig.disabled = true
      this.buttonConfig.submitted = false
    }
    if (this.step.state == 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    }
  }
}
