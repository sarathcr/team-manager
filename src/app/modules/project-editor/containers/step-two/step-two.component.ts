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
  projectId: number
  active: boolean = false
  constructor() { }

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
          this.projectId = data?.id
          let tempinitialFormData = new formTwoInitData
          this.initialFormData.themes = []
          if (data?.themes) {
            tempinitialFormData.themes.push(...data.themes)
            this.textAreaConfig.options = []
            this.textAreaConfig.options.push(...data.themes)
          }
          this.initialFormData = tempinitialFormData
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
    if (this.initialFormData.themes.length  && this.isEqual(this.initialFormData.themes, this.finalFormData.themes)) {
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
    this.finalFormData.themes = this.finalFormData.themes.filter( theme => theme.name !== null)
    let tempData = []
    this.finalFormData.themes.forEach( (theme, index) => {
      tempData.push({id: index+1,name: theme.name})
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
    this.handleButtonType()
    this.onSubmit.emit(formData)
    this.buttonConfig.submitted = true
  }
  checkInProgress() {
    let values: Array<any> = []
    values.push(this.isEqual(this.initialFormData.themes, this.finalFormData.themes))
    if (values.includes(false)) {
      this.step.state = 'INPROCESS'
    }
    this.buttonConfig.submitted = this.step.state == 'DONE'
  }
  textAreaUpdate(data) { // call on each update
    const index = this.finalFormData.themes.findIndex((e) => e.id === data.id);
    if (index === -1) {
      this.finalFormData.themes.push(data);
    } else {
      this.finalFormData.themes[index] = data;
    }
    (this.finalFormData.themes[0].name === null || this.finalFormData.themes[0].name === undefined || this.finalFormData.themes[0].name.length == 0)? this.buttonConfig.disabled = true: this.buttonConfig.disabled = false
    this.checkInProgress()
  }
  addTheme(data){
    this.textAreaConfig.options = this.finalFormData.themes
    this.handleButtonType()
  }
  deleteTheme(data){
    this.finalFormData.themes = this.finalFormData.themes.filter( theme => theme.id !== data.val[data.index].id)
    let temp:Theme[] = []
    this.finalFormData.themes.forEach( (theme, index) => {
      if(theme.name !== null){
        temp.push({id: index+1,name: theme.name})
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
