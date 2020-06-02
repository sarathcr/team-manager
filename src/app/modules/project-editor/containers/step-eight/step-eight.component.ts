import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/shared/constants/project.model';
import { StepId, Step, StepState, Status } from '../../constants/step.model';
import { buttonSubmitConfig } from '../../constants/form-config.data';
import { TranslateService } from '@ngx-translate/core';
import { FormEightInitData, FormEight } from '../../constants/step-forms.model';
import { formEightInitData } from '../../constants/step-forms.data';

@Component({
  selector: 'app-step-eight',
  templateUrl: './step-eight.component.html',
  styleUrls: ['./step-eight.component.scss']
})
export class StepEightComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() stepStatus$: Observable<StepState>
  @Input() step: Step
  finalProduct: any
  buttonConfig = new buttonSubmitConfig
  initialFormData: FormEightInitData = formEightInitData
  active: boolean = false
  initialFormStatus: Status

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.formInit()
    this.translate()
    this.onScrollSubmit()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  formInit() {
    if (this.project$)
      this.project$.subscribe(data => {
        if (data?.finalProduct) {
          this.finalProduct = data.finalProduct
          this.initialFormData = data.finalProduct
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
              if (formStatus[0].state != "DONE" && this.finalProduct?.length)
                this.buttonConfig.disabled = false
            }
          }
        )
  }

  // Function to check status of step
  checkStatus() {
    if (this.finalProduct.length && this.finalProduct !== this.initialFormData) {
      this.step.state = 'INPROCESS'
    }
    if (!this.finalProduct.length || this.finalProduct === this.initialFormData) {
      this.step.state = 'PENDING'
    }
    if (this.finalProduct.length && this.finalProduct === this.initialFormData && this.initialFormStatus == 'DONE') {
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
  onValueChange(value: string) {
    this.finalProduct = value
    this.checkStatus()
  }

  //Handle submit functionality
  handleSubmit(formStatus?: Status) {
    if (formStatus == 'DONE')
      this.step.state = 'DONE'
    this.handleButtonType()
    const formData: FormEight = {
      data: {
        finalProduct: this.finalProduct
      },
      stepStatus: {
        state: [
          {
            state: this.step.state,
            stepid: this.step.stepid
          }
        ]
      }
    }
    this.onSubmit.emit(formData);
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
    if (this.initialFormData !== this.finalProduct) {
      return true
    } else {
      return false
    }
  }

  // Function to submit data on scroll
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
}


