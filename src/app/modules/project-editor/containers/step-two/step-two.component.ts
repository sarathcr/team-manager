import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'

import { FormTwo } from '../../constants/model/step-forms.model'
import { Theme, Step, Status } from 'src/app/modules/project-editor/constants/model/project.model'
import { FieldEvent } from 'src/app/shared/constants/model/form-elements.model'

import { ButtonSubmitConfig } from 'src/app/shared/constants/data/form-elements.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  themes$: Observable<Theme[]>
  themes: Theme[] = []
  buttonConfig = new ButtonSubmitConfig()
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()
  isFormUpdated = false

  constructor(private editor: EditorService) { }

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
    this.project$ = this.editor.getDataByStep(2)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[1]
    if (this.project$) {
      this.themes$ = this.project$.pipe(map(data => data?.themes))
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE'
            this.initialFormStatus = formStatus.state
            if (formStatus.state === 'INPROCESS') {
              this.buttonConfig.disabled = false
            }
          }
        }
      )
    }
  }

  textAreaUpdate(data: FieldEvent): void { // calls on every update
    this.themes = data.values
    this.isFormUpdated = data.updated
    if (data.updated) {
      this.step.state = data.status
      this.handleButtonType()
    }
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
    const tempData = this.themes.map(item => item.id == null ? { name: item.name } : item)
    this.themes = tempData
    const formData: FormTwo = {
      data: {
        themes: tempData.length ? this.themes : []
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
