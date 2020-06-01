import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { Project } from 'src/app/shared/constants/project.model'
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model'
import { StepState, StepId, Step } from '../../constants/step.model'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  @Input() spyActive$: Observable<StepId>
  @Input() stepStatus$: Observable<StepState>
  @Input() step: Step
  projectId: number
  initialFormData: FormTwoInitData = new formTwoInitData
  finalFormData: FormTwoInitData = new formTwoInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  active: boolean = false
  constructor() { }

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
      label: 'MARCAR COMO HECHO',
      successLabel: 'Hecho',
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
    };
    this.textAreaConfig = {
      label: 'Especifica uno o más temas',
      name: 'textarea',
      field: 'themes',
      placeholder: 'Especifica uno o más temas',
      id: 'themes',
      options: [{id: 1, name: null}]
    }
  }
  formInIt() {
    if (this.project$)
      this.project$
        .subscribe( data => {
          let tempinitialFormData: FormTwoInitData = new formTwoInitData
          this.projectId = data?.id
          let project = Object.assign(data)
          console.log(project)
          tempinitialFormData.themes = []
          // tempinitialFormData.themes.push({ id: 1, name: null })
          if (project?.themes.length>0) {
            this.initialFormData.themes.push(...project.themes)
            tempinitialFormData.themes.push(...project.themes)
          }
          this.textAreaConfig.options = tempinitialFormData.themes
          if (project?.themes.length < 5) {
            this.textAreaConfig.options.push({ id: tempinitialFormData.themes.length+1, name: null})
          }
        })
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

  changeResponseFormat(data: any) {
    return data.map(({ id, name }) => ({ id, name }))
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
    if (!this.initialFormData.themes.length) {
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
  handleSubmit() {
    this.checkStatus()
    // this.initialFormData.themes = this.initialFormData.themes.filter( theme => theme.name !== null)
    // this.initialFormData.themes.forEach( (theme, index) => { theme.id = index+1})
    this.finalFormData.themes = this.finalFormData.themes.filter( theme => theme.name !== null)
    this.finalFormData.themes.forEach( (theme, index) => { theme.id = index+1})
    let formData: FormTwo = {
      data: {
        themes:  this.finalFormData.themes,
      },
      stepStatus: {
        id: this.projectId,
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
  }

  textAreaUpdate(data){
    (data.val[0].name === null || data.val[0].name === undefined || data.val[0].name.length == 0)? this.buttonConfig.disabled = true: this.buttonConfig.disabled = false
  }
  addTheme(data){
    this.initialFormData.themes = Object.assign(data.val)
    // this.finalFormData = Object.assign(this.finalFormData,this.initialFormData)
    this.initialFormData.themes.forEach( (theme, index) => {
      this.finalFormData.themes.push({id: index+1,name: theme.name})
      // this.finalFormData.themes[index].name = theme.name
    })
    console.log(this.finalFormData.themes)
    this.initialFormData.themes = this.finalFormData.themes
    if(this.textAreaConfig.options.length < 5 && this.textAreaConfig.options[this.textAreaConfig.options.length-1].name !== null){
      this.textAreaConfig.options.push({id: this.textAreaConfig.options[this.textAreaConfig.options.length-1].id+1, name: null})
    }
  }
  deleteTheme(data){
    this.initialFormData.themes = this.initialFormData.themes.filter( theme => theme.id !== data.val[data.index].id)
    this.initialFormData.themes.forEach( (theme, index) => { theme.id = index+1})
    this.textAreaConfig.options = this.initialFormData.themes
  }
}
