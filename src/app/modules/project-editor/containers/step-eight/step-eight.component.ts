import { Component, OnDestroy, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'

import { FieldEvent } from 'src/app/shared/constants/model/form-elements.model'
import { Status, Step } from '../../constants/model/project.model'
import { FormEight } from '../../constants/model/step-forms.model'

import { StepButtonSubmitConfig } from '../../../../shared/constants/data/form-elements.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-eight',
  templateUrl: './step-eight.component.html',
  styleUrls: ['./step-eight.component.scss'],
})
export class StepEightComponent implements OnInit, OnDestroy {
  project$: Observable<any>
  step$: Observable<Step>
  finalProduct$: Observable<string>
  step: Step
  finalProduct = ''
  buttonConfig = new StepButtonSubmitConfig()
  initialFormStatus: Status = 'PENDING'
  subscription = new SubSink()
  isFormUpdated = false
  localExperienceType: number

  constructor(private editor: EditorService) {}

  ngOnInit(): void {
    this.stepInIt()
    this.localExperienceType = this.editor.getLocalExperienceType()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated) {
      this.handleSubmit()
    }
    this.subscription.unsubscribe()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(8)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[7]
    if (this.project$) {
      this.finalProduct$ = this.project$.pipe(map((data) => data.finalProduct))
    }
    if (this.step$) {
      this.subscription.sink = this.step$.subscribe((formStatus) => {
        if (formStatus) {
          this.buttonConfig.submitted = formStatus.state === 'DONE'
          this.initialFormStatus = formStatus.state
        }
      })
    }
  }

  // Function to trigger the value in the textarea
  onValueChange(value: FieldEvent): void {
    this.finalProduct = value.value
    this.isFormUpdated = value.updated
    if (value.updated) {
      this.step.state = value.status
      this.handleButtonType()
    } else if (
      this.initialFormStatus !== 'DONE' &&
      this.initialFormStatus === 'INPROCESS'
    ) {
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
      this.step.state = 'DONE'
    }
    this.handleButtonType()
    const formData: FormEight = {
      data: {
        finalProduct: this.finalProduct,
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid,
          },
        ],
      },
    }
    this.isFormUpdated = false
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }
}
