import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step, StepId, StepState, Status } from '../../constants/step.model';
import { buttonSubmitConfig } from '../../constants/form-config.data';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/constants/project.model';
import { FormSixInitData, FormSix } from '../../constants/step-forms.model';
import { formSixInitData } from '../../constants/step-forms.data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.scss']
})
export class StepSixComponent implements OnInit {

  @Input() step: Step 
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() stepStatus$: Observable<StepState>
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  initialFormStatus: Status
  initialFormData: FormSixInitData = formSixInitData
  buttonConfig = new buttonSubmitConfig
  creativeTitle:string = ''
  creativeImage:string = ''
  
  constructor() { }

  ngOnInit(): void {
    this.formInit()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  formInit() {
    if (this.project$)
      this.project$.subscribe(data => {
        if (data?.creativeTitle) {
          this.creativeTitle = data.creativeTitle
          this.initialFormData = data.creativeTitle
        }
      })
    if (this.stepStatus$)
      this.stepStatus$.pipe(
        map(data => data?.steps?.filter(statusData => statusData.stepid == this.step.stepid)))
        .subscribe(
          formStatus => {
            if (formStatus && formStatus.length) {
              this.buttonConfig.submitted = formStatus[0].state == "DONE"
              this.initialFormStatus = formStatus[0].state
              if (formStatus[0].state != "DONE" && this.creativeTitle?.length)
                this.buttonConfig.disabled = false
            }
          }
        )
  }

  //Handle submit functionality
  handleSubmit(formStatus?: Status) {
    if (formStatus == 'DONE')
      this.step.state = 'DONE'
    this.initialFormData = this.creativeTitle
    this.handleButtonType()
    const formData: FormSix = {
      data: {
        creativeTitle: this.creativeTitle
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
    this.onSubmit.emit(formData);
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

  // Function to check status of step
  checkStatus() {
    if (this.creativeTitle.length && this.creativeTitle !== this.initialFormData) {
      this.step.state = 'INPROCESS'
    }
    if (!this.creativeTitle.length) {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  // Function to trigger the value in the textarea
  onValueChange(value: string, imageURL: string) {
    this.creativeTitle = value
    this.creativeImage = imageURL
    this.checkStatus()
  }

  // Function to check whether the form is updated
  isFormUpdated() {
    if (this.initialFormData !== this.creativeTitle || this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }
  
}
