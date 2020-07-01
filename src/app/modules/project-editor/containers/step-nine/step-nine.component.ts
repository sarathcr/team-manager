import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'

import { EditorService } from '../../services/editor/editor.service'

import { Step, Status } from '../../constants/step.model'
import { FormNineInit, FormNine } from '../../constants/step-forms.model'

import { FormNineInitData } from '../../constants/step-forms.data'
import { ButtonSubmitConfig } from '../../constants/form-config.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-nine',
  templateUrl: './step-nine.component.html',
  styleUrls: ['./step-nine.component.scss']
})
export class StepNineComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  synopsis: any = ''
  initialFormData: FormNineInit = FormNineInitData
  initialFormStatus: Status = 'PENDING'
  buttonConfig = new ButtonSubmitConfig()
  subscriptions = new SubSink()

  constructor(public editor: EditorService) { }

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
    this.project$ = this.editor.getDataByStep(9)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[8]
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        if (data?.synopsis) {
          this.synopsis = data.synopsis
          this.initialFormData = data.synopsis
        }
      })
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE'
            this.initialFormStatus = formStatus.state
            if (formStatus.state !== 'DONE' && this.synopsis?.length) {
              this.buttonConfig.disabled = false
            }
          }
        }
      )
    }
  }

  // Function to check status of step
  checkStatus(): void {
    if (this.synopsis.length && this.synopsis !== this.initialFormData) {
      this.step.state = 'INPROCESS'
    }
    if (!this.synopsis.length) {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  // Function to trigger the value in the textarea
  onValueChange(value: string): void {
    this.synopsis = value
    this.checkStatus()
  }

  // Function to check whether the form is updated
  isFormUpdated(): boolean {
    if (this.initialFormData !== this.synopsis || this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
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

  // Handle submit functionality
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = formStatus
    }
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
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }
}
