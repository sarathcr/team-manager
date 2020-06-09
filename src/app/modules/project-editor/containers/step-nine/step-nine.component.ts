import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step, Status, StepId, StepState } from '../../constants/step.model';
import { FormNineInitData, FormNine } from '../../constants/step-forms.model';
import { formNineInitData } from '../../constants/step-forms.data';
import { buttonSubmitConfig } from '../../constants/form-config.data';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-step-nine',
  templateUrl: './step-nine.component.html',
  styleUrls: ['./step-nine.component.scss']
})
export class StepNineComponent implements OnInit {

  @Input() step: Step 
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() stepStatus$: Observable<StepState>
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  synopsis:any = ''
  initialFormData: FormNineInitData = formNineInitData
  initialFormStatus: Status
  buttonConfig = new buttonSubmitConfig
  
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.formInit()
    this.translate()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  formInit() {
    if (this.project$)
      this.project$.subscribe(data => {
        if (data?.synopsis) {
          this.synopsis = data.synopsis
          this.initialFormData = data.synopsis
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
              if (formStatus[0].state != "DONE" && this.synopsis?.length)
                this.buttonConfig.disabled = false
            }
          }
        )
  }

  //Handle submit functionality
  handleSubmit(formStatus?: Status) {
    if (formStatus == 'DONE')
      this.step.state = 'DONE'
    this.initialFormData = this.synopsis
    this.handleButtonType()
    const formData: FormNine = {
      data: {
        synopsis: this.synopsis
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
    if (this.synopsis.length && this.synopsis !== this.initialFormData) {
      this.step.state = 'INPROCESS'
    }
    if (!this.synopsis.length) {
      this.step.state = 'PENDING'
    }
    if (this.synopsis.length && this.synopsis === this.initialFormData && this.initialFormStatus == 'DONE') {
      this.step.state = 'DONE'
    }
    this.handleButtonType()
  }

  // Function to trigger the value in the textarea
  onValueChange(value: string) {
    this.synopsis = value
    this.checkStatus()
  }

  // Function to translate button label
  translate() {
    this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
    })
  }

  // Function to check whether the form is updated
  isFormUpdated() {
    if (this.initialFormData !== this.synopsis) {
      return true
    } else {
      return false
    }
  }

}
