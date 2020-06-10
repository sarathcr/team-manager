import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Project } from 'src/app/shared/constants/project.model'
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model'
import { StepState, StepId, Step, Status } from '../../constants/step.model'
import { Theme } from 'src/app/shared/constants/theme.model'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit, OnDestroy {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() stepStatus$: Observable<StepState>
  @Input() step: Step
  themes$: Observable<Theme[]>
  InputFormData: FormTwoInitData = new formTwoInitData
  initialFormData: FormTwoInitData = new formTwoInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  active: boolean = false
  initialFormStatus: Status = "PENDING"

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.onScrollSubmit()
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
      submitted: false,
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
    let tempinitialFormData = new formTwoInitData
    if (this.project$) {
      this.themes$ = this.project$.pipe(map(project => project.themes.map(theme => ({ id: theme.id, name: theme.name }))))
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
    if (this.stepStatus$) {
      this.stepStatus$.pipe(
        map(data => data?.steps?.filter(statusData => statusData.stepid == this.step.stepid)))
        .subscribe(
          formStatus => {
            if (formStatus && formStatus.length) {
              this.buttonConfig.submitted = formStatus[0].state == "DONE"
              this.initialFormStatus = formStatus[0].state
              if (formStatus[0].state != "DONE" && this.checkNonEmptyForm())
                this.buttonConfig.disabled = false
            }
          }
        )
    }
  }

  onScrollSubmit() {
    this.spyActive$
      .subscribe(sectionId => {
        if (sectionId === this.step.sectionid && !this.active) {
          this.active = true
        }
        if (sectionId !== this.step.sectionid && this.active) {
          if (this.isFormUpdated()) {
            this.handleSubmit()
            this.active = false
          } else {
            this.active = true
          }
        }
      })
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
    if (!this.isEqual(this.initialFormData.themes, this.InputFormData.themes)) {
      return true
    } else if (this.initialFormStatus !== this.step.state) {
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
    this.onSubmit.emit(formData)
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
