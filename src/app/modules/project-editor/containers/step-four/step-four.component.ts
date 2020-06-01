import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/constants/project.model';
import { StepId, Step, StepState } from '../../constants/step.model';
import { buttonSubmitConfig } from '../../constants/form-config.data';
import { TranslateService } from '@ngx-translate/core';
import { FormSevenInitData, FormSeven } from '../../constants/step-forms.model';
import { formSevenInitData } from '../../constants/step-forms.data';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() step: Step
  finalProduct: any
  buttonConfig = new buttonSubmitConfig
  initialFormData: FormSevenInitData = formSevenInitData
  active: boolean = false

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.finalProduct = ''
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
  }

  // Function to check status of step
  checkStatus() {
    if (this.finalProduct.length && this.finalProduct !== this.initialFormData) {
      this.step.state = 'INPROCESS'
    }
    if (!this.finalProduct.length || this.finalProduct === this.initialFormData) {
      this.step.state = 'PENDING'
    }
    if (this.finalProduct.length && this.finalProduct === this.initialFormData) {
      this.step.state = 'DONE'
    }
    this.handleButtonType()
  }

  // Changes the button according to form status
  handleButtonType() {
    if (this.step.state == 'INPROCESS') {
      this.buttonConfig.disabled = false
    }
    if (this.step.state == 'PENDING') {
      this.buttonConfig.disabled = true
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
  handleSubmit() {
    this.step.state = 'DONE'
    this.handleButtonType()
    const formData: FormSeven = {
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


