import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

import { EditorService } from '../../services/editor/editor.service'

import { FormTwoInit, FormTwo } from '../../constants/model/step-forms.model'
import { Theme, Step, Status } from 'src/app/modules/project-editor/constants/model/project.model'

import { FormTwoInitData } from '../../constants/Data/step-forms.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { ButtonSubmitConfig } from 'src/app/shared/constants/data/form-config.data'

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
  inputFormData: FormTwoInit = new FormTwoInitData()
  initialFormData: FormTwoInit = new FormTwoInitData()
  buttonConfig = new ButtonSubmitConfig()
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()
  isFormUpdated = false

  constructor(
    private translateService: TranslateService,
    private editor: EditorService
  ) { }

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
    const tempinitialFormData = new FormTwoInitData()
    if (this.project$) {
      this.themes$ = this.project$.pipe(map(data => data?.themes))
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

  textAreaUpdate(data: any): void { // calls on every update
    this.inputFormData.themes = data.val
    this.isFormUpdated = data.updated
    if (data.updated) {
      this.step.state = data.status
      this.handleButtonType()
    } else if (this.initialFormStatus !== 'DONE' && this.initialFormStatus === 'INPROCESS') {
      this.buttonConfig.disabled = false
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
    const tempData = this.inputFormData.themes.map(item => item.id == null ? { name: item.name } : item)
    this.inputFormData.themes = tempData
    this.initialFormData.themes = tempData
    const formData: FormTwo = {
      data: {
        themes: tempData.length ? this.inputFormData.themes : []
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
