import { Option } from './../../../../shared/constants/field.model'
import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

import { EditorService } from '../../services/editor/editor.service'

import { FormTwoInit, FormTwo } from '../../constants/step-forms.model'
import { Step, Status } from '../../constants/step.model'
import { Theme } from 'src/app/modules/project-editor/constants/project.model'
import { FieldConfig } from '../../../../shared/constants/field.model'

import { FormTwoInitData } from '../../constants/step-forms.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { compareArray } from 'src/app/shared/utility/array.utility'

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
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()

  constructor(
    private translateService: TranslateService,
    private editor: EditorService
  ) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.stepInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
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
      this.subscriptions.sink = this.themes$
        .subscribe(themes => {
          this.initialFormData.themes = []
          if (themes) {
            tempinitialFormData.themes = [...themes]
            this.inputFormData.themes = [...themes]
          }
          this.initialFormData.themes = [...tempinitialFormData.themes]
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

  // Function to check status of step
  checkStatus(): void {
    if (!this.checkNonEmptyForm()) {
      this.step.state = 'PENDING'
    }
    else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  // checks the form is completely filled or not
  checkNonEmptyForm(): boolean {
    if (this.inputFormData.themes.length) {
      return true
    }
    return false
  }

  // Function to check whether the form is updated
  isFormUpdated(): boolean {
    const initialData = this.initialFormData.themes.map(item => item.name)
    const inputData = this.inputFormData.themes.map(item => item.name)
    if (!compareArray(initialData, inputData) ||
      this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

  textAreaUpdate(data: Option[]): void { // calls on every update
    this.inputFormData.themes = data
    this.checkStatus()
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
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }

  // Function to create the form config
  createFormConfig(): void {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'themes',
      id: 'themes',
      maxLength: 150,
      limit: 5
    }
    // Translation
    this.subscriptions.sink = this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'THEMATIC.project_thematic_title',
      'THEMATIC.project_thematic_description',
      'THEMATIC.project_thematic_placeholder'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
      this.textAreaConfig.placeholder = translations['THEMATIC.project_thematic_placeholder']
    })
  }
}
