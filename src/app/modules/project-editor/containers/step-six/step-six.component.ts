import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'

import { EditorService } from '../../services/editor/editor.service'

import { Step, Status } from '../../constants/model/project.model'
import { FormSixInit, FormSix } from '../../constants/model/step-forms.model'

import { ButtonSubmitConfig } from '../../../../shared/constants/data/form-config.data'
import { FormSixInitData } from '../../constants/Data/step-forms.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.scss']
})
export class StepSixComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  initialFormData: FormSixInit = new FormSixInitData()
  buttonConfig = new ButtonSubmitConfig()
  initialFormStatus: Status = 'PENDING'
  creativeTitle = ''
  creativeImage = ''
  subscriptions = new SubSink()

  constructor(private editor: EditorService) { }

  ngOnInit(): void {
    this.stepInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(6)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[5]
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        if (data) {
          this.creativeTitle = data.creativeTitle
          this.initialFormData.creativeTitle = data.creativeTitle
          this.creativeImage = data.creativeImage
          this.initialFormData.creativeImage = data.creativeImage
        }
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

  // Function to trigger the value in the textarea
  onValueChange(value: string): void {
    this.creativeTitle = value
    this.checkStatus()
  }

  onFileSelect(url: string): void {
    this.creativeImage = url
    this.checkStatus()
  }

  // Function to check status of step
  checkStatus(): void {
    if (!this.creativeTitle && !this.creativeImage) {
      this.step.state = 'PENDING'
    }
    else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  // Function to check whether the form is updated
  isFormUpdated(): boolean {
    if (this.initialFormData.creativeTitle !== this.creativeTitle ||
      this.initialFormData.creativeImage !== this.creativeImage ||
      this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm(): boolean {
    if (this.creativeTitle && this.creativeImage) {
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
      if (this.checkNonEmptyForm()) {
        this.buttonConfig.disabled = false
        this.buttonConfig.submitted = false
      } else {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = false
      }
    }
  }

  // Handle submit functionality
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
    }
    this.handleButtonType()
    const formData: FormSix = {
      data: {
        creativeTitle: this.creativeTitle,
        creativeImage: this.creativeImage
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
    this.initialFormData = formData.data
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }
}
