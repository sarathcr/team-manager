import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Step, Status } from '../../constants/step.model';
import { buttonSubmitConfig } from '../../constants/form-config.data';
import { FormEightInitData, FormEight } from '../../constants/step-forms.model';
import { formEightInitData } from '../../constants/step-forms.data';
import { EditorService } from '../../services/editor/editor.service';

@Component({
  selector: 'app-step-eight',
  templateUrl: './step-eight.component.html',
  styleUrls: ['./step-eight.component.scss']
})
export class StepEightComponent implements OnInit {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  finalProduct: any = ""
  buttonConfig = new buttonSubmitConfig
  initialFormData: FormEightInitData = formEightInitData
  active: boolean = false
  initialFormStatus: Status = "PENDING"

  constructor(
    private editor: EditorService
  ) { }

  ngOnInit(): void {
    this.formInit()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  formInit() {
    this.project$ = this.editor.getStepData('stepEight')
    this.step$ = this.editor.getStepStatus(8)
    this.step = this.editor.steps.eight
    if (this.project$) {
      this.project$.subscribe(data => {
        if (data?.finalProduct) {
          this.finalProduct = data.finalProduct
          this.initialFormData = data.finalProduct
        }
      })
    }
    if (this.step$) {
      this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state == "DONE"
            this.initialFormStatus = formStatus.state
            if (formStatus.state != "DONE" && this.finalProduct?.length)
              this.buttonConfig.disabled = false
          }
        }
      )
    }
  }

  // Function to check status of step
  checkStatus() {
    if (this.finalProduct.length && this.finalProduct !== this.initialFormData) {
      this.step.state = 'INPROCESS'
    }
    if (!this.finalProduct.length) {
      this.step.state = 'PENDING'
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
    this.initialFormData = this.finalProduct
    this.handleButtonType()
    const formData: FormEight = {
      data: {
        finalProduct: this.finalProduct
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
    this.editor.handleStepSubmit(formData, this.step.state == "DONE")
  }

  // Function to check whether the form is updated
  isFormUpdated() {
    if (this.initialFormData !== this.finalProduct || this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

}


