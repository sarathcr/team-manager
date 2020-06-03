import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { formSevenInitData } from '../../constants/step-forms.data'
import { FormSevenInitData, FormSeven } from '../../constants/step-forms.model'
import { Step, StepId, StepState, Status } from '../../constants/step.model'
import { FieldConfig } from 'src/app/shared/constants/field.model'
import { Project } from 'src/app/shared/constants/project.model'
import { DrivingGuestion } from 'src/app/shared/constants/driving-questions.model';

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
  thematicTitle: string
  thematicDescription: string
  thematicPlaceholder: string
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
      this.textPlaceholder = translations['DRIVING_QUESTIONS.project_drivingquestions_placeholder']
      this.formTitle = translations['DRIVING_QUESTIONS.project_drivingquestions_title']
      this.formDescription = translations['DRIVING_QUESTIONS.project_drivingquestions_description']
    })
  }

  formInIt(){
    if (this.project$)
      this.project$.subscribe(data => {
        if (data?.drivingQuestions) {
          console.log(data?.drivingQuestions)
          this.drivingQuestions = [...data.drivingQuestions]
          this.initialFormData.drivingQuestions = [...data.drivingQuestions]
        }
        if(!this.drivingQuestions.length){
          this.drivingQuestions.push({id: null, name: null})
        }
      })
    if (this.stepStatus$)
      this.stepStatus$.pipe(
        map(data => data?.state?.filter(statusData => statusData.stepid == this.step.stepid)))
        .subscribe(
          formStatus => {
            if (formStatus && formStatus.length) {
              this.buttonConfig.submitted = formStatus[0].state == "DONE"
              this.initialFormStatus = formStatus[0].state
              if (formStatus[0].state != "DONE" && this.drivingQuestions?.length)
                this.buttonConfig.disabled = false
            }
          }
        )
  }

  handleSubmit(){}

  onScrollSubmit() {
    this.spyActive$
      .subscribe(sectionId => {
        if (sectionId === this.step.sectionid && !this.active) {
          this.active = true
        }
        if (sectionId !== this.step.sectionid && this.active) {
          if (this.isFormUpdated()) {
            this.handleSubmit()
            this.active = false
          } else {
            this.active = true
          }
        }
      })
  }

  // Function to check status of step
  checkStatus() {
    if (this.drivingQuestions.length && this.isEqual(this.initialFormData.drivingQuestions,this.drivingQuestions)) {
      this.step.state = 'INPROCESS'
    }
    if (!this.drivingQuestions.length) {
      this.step.state = 'PENDING'
    }
    if (this.drivingQuestions.length && this.isEqual(this.initialFormData.drivingQuestions,this.drivingQuestions) && this.initialFormStatus == 'DONE') {
      this.step.state = 'DONE'
    }
    this.handleButtonType()
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

  // Function to trigger the value in the textarea
  onValueChange(value: DrivingGuestion[]) {
    console.log(value)
    this.drivingQuestions = value
    this.checkStatus()
  }
  addDrivingQuestion(data){

  }
  deleteDrivingQuestion(data){

  }

  // Function to check whether the form is updated
  isFormUpdated() {
    if (this.isEqual(this.initialFormData.drivingQuestions,this.drivingQuestions)) {
      return true
    } else {
      return false
    }
  }

  isEqual(d1: any[], d2: any[]) {
    return JSON.stringify(d1) === JSON.stringify(d2)
  }
}
