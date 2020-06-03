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
  initialFormData: FormTwoInitData = new formTwoInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  thematicTitle: string
  thematicDescription: string
  thematicPlaceholder: string
  projectId: number
  active: boolean = false
  initialFormStatus: Status

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
      options: [{id: null, name: null}]
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
      this.thematicTitle = translations['THEMATIC.project_thematic_title']
      this.thematicDescription = translations['THEMATIC.project_thematic_description']
      this.thematicPlaceholder = translations['THEMATIC.project_thematic_placeholder']
      this.textAreaConfig.placeholder = this.thematicPlaceholder
      this.textAreaConfig.label = this.thematicPlaceholder
    })
  }

  formInIt() {
    if (this.project$)
      this.project$
        .subscribe( data => {
          this.projectId = data?.id
          let tempinitialFormData = new formTwoInitData
          this.initialFormData.themes = []
          if (data?.themes) {
            tempinitialFormData.themes.push(...data.themes)
            this.textAreaConfig.options = []
            this.textAreaConfig.options.push(...data.themes)
          }
          this.initialFormData.themes = [...tempinitialFormData.themes]
          if(!this.textAreaConfig.options.length){
            this.textAreaConfig.options = [{ id: 1, name: null }]
          }
        })
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

  checkStatus() {
    if (this.checkEmptyForm()) {
      this.step.state = "PENDING"
    } else {
      if (this.checkNonEmptyForm() === true) {
        this.step.state = "DONE"
      } else {
        this.step.state = "INPROCESS"
      }
    }
  }

  // checks if the form is empty
  checkEmptyForm() {
    if (!this.textAreaConfig.options.length) {
      return true
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm() {
    if (this.initialFormData.themes.length) {
      return true
    }
    return false
  }

  isFormUpdated() {
    if (!this.isEqual(this.initialFormData.themes, this.textAreaConfig.options)) {
      return true
    } else {
      return false
    }
  }

  isEqual(d1: any[], d2: any[]) {
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

  handleSubmit(formStatus?: Status) {
    this.checkStatus()
    let tempData = []
    this.textAreaConfig.options.forEach( (theme, index) => {
      tempData.push({id: theme.id,name: theme.name})
    })
    this.textAreaConfig.options = tempData
    let formData: FormTwo = {
      data: {
        themes:  this.textAreaConfig.options,
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
    if (formStatus == 'DONE' && this.checkNonEmptyForm()) {
      this.buttonConfig.submitted = this.step.state == 'DONE'
      this.buttonConfig.disabled = this.step.state == "DONE"
    }
    this.onSubmit.emit(formData)
    this.buttonConfig.submitted = true
  }

  checkInProgress() {
    let values: Array<any> = []
    values.push(this.isEqual(this.initialFormData.themes, this.textAreaConfig.options))
    if (values.includes(false)) {
      this.step.state = 'INPROCESS'
      this.buttonConfig.disabled = false
    }
    this.buttonConfig.submitted = this.step.state == 'DONE'
  }

  textAreaUpdate(data) { // calls on every update
    this.textAreaConfig.options = data
    this.checkInProgress()
  }

  handleButtonType() {
    if (this.isFormUpdated()) {
      if (this.checkNonEmptyForm()) {
        this.buttonConfig.disabled = false
        this.buttonConfig.submitted = false
      } else {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = false
      }
    } else if (this.checkNonEmptyForm()) {
      if (this.initialFormStatus == 'DONE') {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = true
        this.step.state = "DONE"
      }
    } else {
      this.buttonConfig.disabled = true
      this.buttonConfig.submitted = false
    }
  }
}
