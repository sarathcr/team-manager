import { Component, OnInit, OnDestroy } from '@angular/core'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model'
import { Step, Status } from '../../constants/step.model'
import { Theme } from 'src/app/shared/constants/theme.model'
import { EditorService } from '../../services/editor/editor.service'

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
  InputFormData: FormTwoInitData = new formTwoInitData
  initialFormData: FormTwoInitData = new formTwoInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  initialFormStatus: Status = "PENDING"

  constructor(
    private translateService: TranslateService,
    private editor: EditorService
  ) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.formInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  createFormConfig() {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false
    };
    this.textAreaConfig = {
      name: 'textarea',
      field: 'themes',
      id: 'themes',
      maxLength: 150,
      limit: 5
    }
    // Translation
    this.translateService.stream([
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

  formInIt() {
    this.project$ = this.editor.getStepData('stepTwo')
    this.step$ = this.editor.getStepStatus(2)
    this.step = this.editor.steps.two
    let tempinitialFormData = new formTwoInitData
    if (this.project$) {
      this.themes$ = this.project$
      this.themes$
        .subscribe(themes => {
          this.initialFormData.themes = []
          if (themes) {
            tempinitialFormData.themes = [...themes]
            this.InputFormData.themes = [...themes]
          }
          this.initialFormData.themes = [...tempinitialFormData.themes]
        })
    }
    if (this.step$) {
      this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state == "DONE"
            this.initialFormStatus = formStatus.state
            if (formStatus.state != "DONE" && this.checkNonEmptyForm())
              this.buttonConfig.disabled = false
          }
        }
      )
    }
  }

  // Function to check status of step
  checkStatus() {
    if (this.checkEmptyForm())
      this.step.state = "PENDING"
    else
      this.step.state = "INPROCESS"
    this.handleButtonType()
  }

  // checks if the form is empty
  checkEmptyForm() {
    if (!this.InputFormData.themes.length) {
      return true
    } else {
      const tempData = this.InputFormData.themes.filter(item => item.name != null && item.name.length && item)
      if (!tempData.length)
        return true
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm() {
    if (this.InputFormData.themes.length && (this.InputFormData.themes[this.InputFormData.themes.length - 1].name != null))
      return true
    return false
  }

  // Function to check whether the form is updated
  isFormUpdated() {
    if (!this.isEqual(this.initialFormData.themes, this.InputFormData.themes) || this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

  isEqual(d1: any[], d2: any[]) {
    d1 = d1.map(item => item.name)
    d2 = d2.map(item => item.name)
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

  handleSubmit(formStatus?: Status) {
    if (formStatus == 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = "DONE"
    }
    else
      this.checkStatus()
    let tempData = this.InputFormData.themes.filter(item => item.name != null && item.name.length)
    if (tempData.length) {
      tempData = tempData.map(item => item.id == null ? { name: item.name } : item)
      this.InputFormData.themes = tempData
      this.initialFormData.themes = tempData
    }
    else {
      this.InputFormData.themes = []
      this.initialFormData.themes = this.InputFormData.themes
    }
    this.InputFormData.themes = tempData
    let formData: FormTwo = {
      data: {
        themes: tempData.length ? this.InputFormData.themes : []
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
    this.handleButtonType()
  }

  textAreaUpdate(data) { // calls on every update
    this.InputFormData.themes = data
    this.checkStatus()
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
}
