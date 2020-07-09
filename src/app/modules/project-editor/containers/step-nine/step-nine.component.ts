import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'

import { Step, Status } from '../../constants/model/project.model'
import { FormNine } from '../../constants/model/step-forms.model'
import { FieldEvent } from 'src/app/shared/constants/model/form-config.model'

import { ButtonSubmitConfig } from '../../../../shared/constants/data/form-config.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-nine',
  templateUrl: './step-nine.component.html',
  styleUrls: ['./step-nine.component.scss']
})
export class StepNineComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  synopsis$: Observable<any>
  step: Step
  synopsis: any = ''
  initialFormStatus: Status = 'PENDING'
  buttonConfig = new ButtonSubmitConfig()
  subscriptions = new SubSink()
  isFormUpdated = false

  constructor(public editor: EditorService) { }

  ngOnInit(): void {
    this.stepInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated) {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(9)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[8]
    if (this.project$) {
      this.synopsis$ = this.project$.pipe(map(data => data.synopsis))
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE'
            this.initialFormStatus = formStatus.state
          }
        }
      )
    }
  }

  // Function to trigger the value in the textarea
  onValueChange(value: FieldEvent): void {
    this.synopsis = value.textValue
    this.isFormUpdated = value.updated
    if (value.updated) {
      this.step.state = value.status
      this.handleButtonType()
    } else if (this.initialFormStatus !== 'DONE' && this.initialFormStatus === 'INPROCESS') {
      this.buttonConfig.disabled = false
    }
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
    this.isFormUpdated = false
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }
}
