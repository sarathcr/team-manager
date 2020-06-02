import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Project } from 'src/app/shared/constants/project.model'
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model'
import { StepState, StepId, Step } from '../../constants/step.model'

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
  finalFormData: FormTwoInitData = new formTwoInitData
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  projectId: number
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
          // let tempinitialFormData: FormTwoInitData = new formTwoInitData
          this.projectId = data?.id
          let project = Object.assign(data)
          this.initialFormData.themes = []
          this.textAreaConfig.options = [{ id: 1, name: null }] // Uncomment this if no need to have a placeholder if data already exist
          if (project?.themes.length>0) {
            this.initialFormData.themes = project.themes
          }
          this.textAreaConfig.options = this.initialFormData.themes
          // if (project?.themes.length < 5) {// Comment this if no need to have a placeholder if data already exist
          //   this.textAreaConfig.options.push({ id: this.initialFormData.themes.length+1, name: null})
          // }
          this.finalFormData.themes = project.themes
        })
    if (this.stepStatus$) {
      this.stepStatus$.pipe(
        map(data => data?.state?.filter(statusData => statusData.stepid == this.step.stepid)))
        .subscribe(
          formStatus => {
            if (formStatus) {
              this.buttonConfig.submitted = formStatus[1].state == "DONE"
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
    if (!this.initialFormData.themes.length) {
      return true
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm() {
    if (this.initialFormData.themes.length  && this.finalFormData.themes === this.initialFormData.themes) {
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
    let tempData = this.finalFormData.themes.filter( theme => theme.name !== null)
    tempData.forEach( (theme, index) => { theme.id = index+1})
    this.finalFormData.themes = tempData
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
    this.handleButtonType()
    this.onSubmit.emit(formData)
  }
  checkInProgress() {
    let values: Array<any> = []
    values.push(this.isEqual(this.initialFormData.themes, this.finalFormData.themes))
    if (values.includes(false)) {
      this.step.state = 'INPROCESS'
    }
    this.buttonConfig.submitted = this.step.state == 'DONE'
  }
  textAreaUpdate(data){ // call on each update
    (data.val[0].name === null || data.val[0].name === undefined || data.val[0].name.length == 0)? this.buttonConfig.disabled = true: this.buttonConfig.disabled = false
    this.checkInProgress()
  }
  addTheme(data){
    this.textAreaConfig.options = Object.assign(data.val)
    this.finalFormData.themes = []
    this.textAreaConfig.options.forEach( (theme, index) => {
      this.finalFormData.themes.push({id: index+1,name: theme.name})
    })
    this.textAreaConfig.options = this.finalFormData.themes
    this.handleButtonType()
  }
  deleteTheme(data){
    this.textAreaConfig.options = this.textAreaConfig.options.filter( theme => theme.id !== data.val[data.index].id)
    this.finalFormData.themes = []
    this.textAreaConfig.options.forEach( (theme, index) => {
      if(theme.name !== null){
        this.finalFormData.themes.push({id: index+1,name: theme.name})
      }
    })
    this.textAreaConfig.options = this.finalFormData.themes
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
