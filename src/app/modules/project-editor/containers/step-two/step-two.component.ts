import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Project } from 'src/app/shared/constants/project.model'
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model'
import { StepState, StepId, Step } from '../../constants/step.model'
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
  updatedThemes: Theme[] = []
  finalFormData: FormTwoInitData = new formTwoInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  thematicTitle: string
  thematicDescription: string
  thematicPlaceholder: string
  projectId: number
  active: boolean = false
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
      label: '',
      name: 'textarea',
      field: 'themes',
      placeholder: '',
      id: 'themes',
      maxLength: 150,
      options: [{id: 1, name: null}]
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
          if(!this.textAreaConfig.options.length){ // Uncomment this if no need to have a placeholder if data already exist
            this.textAreaConfig.options = [{ id: 1, name: null }]
          }
          // if (project?.themes.length < 5) {// Comment this if no need to have a placeholder if data already exist
          //   this.textAreaConfig.options.push({ id: this.initialFormData.themes.length+1, name: null})
          // }
          this.finalFormData.themes = [...tempinitialFormData.themes]
        })
    if (this.stepStatus$) {
      this.stepStatus$.pipe(
        map(data => data?.state?.filter(statusData => statusData.stepid == this.step.stepid)))
        .subscribe(
          formStatus => {
            if (formStatus && formStatus.length) {
              this.buttonConfig.submitted = formStatus[0].state == "DONE"
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
    if (!this.finalFormData.themes.length) {
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
    if (!this.isEqual(this.initialFormData.themes, this.finalFormData.themes)) {
      return true
    } else {
      return false
    }
  }
  isEqual(d1: any[], d2: any[]) {
    return JSON.stringify(d1) === JSON.stringify(d2)
  }
  handleSubmit() {
    this.checkStatus()
    let tempData = []
    this.finalFormData.themes.forEach( (theme, index) => {
      tempData.push({id: theme.id,name: theme.name})
    })
    this.finalFormData.themes = tempData
    let formData: FormTwo = {
      data: {
        themes:  this.finalFormData.themes,
      },
      stepStatus: {
        state: [
          {
            state: this.step.state,
            stepid: this.step.stepid
          }
        ]
      }
    }
    if (this.checkNonEmptyForm()) {
      this.buttonConfig.submitted = this.step.state == 'DONE'
      this.buttonConfig.disabled = this.step.state == "DONE"
    }
    this.onSubmit.emit(formData)
    this.buttonConfig.submitted = true
  }
  checkInProgress() {
    let values: Array<any> = []
    values.push(this.isEqual(this.initialFormData.themes, this.finalFormData.themes))
    if (values.includes(false)) {
      this.step.state = 'INPROCESS'
      this.buttonConfig.disabled = false
    }
    this.buttonConfig.submitted = this.step.state == 'DONE'
  }
  textAreaUpdate(data) { // call on each update
    const index = this.finalFormData.themes.findIndex((e) => e.id === data.id);
    if (index === -1) {
      let innerObj = {name: data.name}
      this.finalFormData.themes.push(innerObj);
    } else {
      this.finalFormData.themes[index] = data
    }
    this.textAreaConfig.options = this.finalFormData.themes
    this.checkInProgress()
  }
  addTheme(data){
    this.textAreaConfig.options = this.finalFormData.themes
    this.handleButtonType()
  }
  deleteTheme(data){
    let temp:Theme[] = []
    this.finalFormData.themes.forEach( theme => {
      if(theme.id === data.val[data.index].id){
        temp.push({id: theme.id})
      } else{
        temp.push(theme)
      }
    })
    this.textAreaConfig.options = this.finalFormData.themes = temp
    this.handleButtonType()
  }
  handleButtonType() {
    this.checkInProgress()
    if(this.step.state == 'INPROCESS'){
      this.buttonConfig.submitted = false
      this.buttonConfig.disabled = false
    } else if(this.step.state == 'PENDING') {
      this.buttonConfig.disabled = true
    } else if(this.step.state == 'DONE'){
      this.buttonConfig.submitted = false
    }
    if(this.textAreaConfig.options.length < 5 && this.textAreaConfig.options[this.textAreaConfig.options.length-1].name !== null){
      this.textAreaConfig.options.push({id: this.textAreaConfig.options[this.textAreaConfig.options.length-1].id+1, name: null})
    }
  }
}
