import { Component, OnDestroy, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'

import { FormSeven } from '../../constants/model/step-forms.model'

import {
  DrivingQuestion,
  Status,
  Step,
} from 'src/app/modules/project-editor/constants/model/project.model'

import { StepButtonSubmitConfig } from 'src/app/shared/constants/data/form-elements.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.scss'],
})
export class StepSevenComponent implements OnInit, OnDestroy {
  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  drivingQuestions: DrivingQuestion[] = []
  buttonConfig = new StepButtonSubmitConfig()
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()
  isFormUpdated = false

  constructor(private editor: EditorService) {}

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
    this.project$ = this.editor.getDataByStep(7)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[6]
    if (this.project$) {
      this.subscriptions.sink = this.project$
        .pipe(map((data) => data?.drivingQuestions))
        .subscribe(
          (drivingQuestions) =>
            (this.drivingQuestions = drivingQuestions ? drivingQuestions : [])
        )
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe((formStatus) => {
        if (formStatus) {
          this.buttonConfig.submitted = formStatus.state === 'DONE'
          this.initialFormStatus = formStatus.state
          if (
            formStatus.state === 'INPROCESS' &&
            this.drivingQuestions?.length
          ) {
            this.buttonConfig.disabled = false
          }
        }
      })
    }
  }

  addDrivingQuestions(): void {
    // calls on every update
    this.checkStepStatus()
    this.handleSubmit()
  }

  // Funtion updates the edited list
  editQuestion(drivingQuestions: DrivingQuestion[]): void {
    this.drivingQuestions = drivingQuestions
    this.checkStepStatus()
    this.handleSubmit()
  }

  // Function updates the deleted
  deleteQuestion(drivingQuestions: DrivingQuestion[]): void {
    this.drivingQuestions = drivingQuestions
    this.checkStepStatus()
    this.isFormUpdated = true
  }

  // checks current form status
  checkStepStatus(): void {
    if (this.drivingQuestions?.length) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    }
    if (this.step.state === 'INPROCESS') {
      this.buttonConfig.disabled = false
      this.buttonConfig.submitted = false
    }
    if (this.step.state === 'PENDING') {
      this.buttonConfig.disabled = true
      this.buttonConfig.submitted = false
    }
  }

  // Function to submit the form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = 'DONE'
    }
    this.handleButtonType()
    const tempData = this.drivingQuestions.map((item) =>
      item.id == null ? { name: item.name } : item
    )
    this.drivingQuestions = tempData
    const formData: FormSeven = {
      data: {
        drivingQuestions: tempData.length ? this.drivingQuestions : [],
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
