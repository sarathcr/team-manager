import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { Project } from 'src/app/shared/constants/project.model'
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model'
import { TextareaField } from 'src/app/shared/constants/textareaField.modal'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  initialFormData: FormTwoInitData = new formTwoInitData
  status: 'inprogress' | 'done' | 'pending' = "pending"
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  constructor() { }

  ngOnInit(): void {
    this.createFormConfig()
    this.formInIt()
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
          tempinitialFormData.themes = []
          tempinitialFormData.themes.push({ id: 1, name: null })
          if (data?.themes.length>0) {
            this.initialFormData.themes = data.themes
            tempinitialFormData.themes = data.themes
          }
          this.textAreaConfig.options = (tempinitialFormData.themes)
          // if (data?.themes.length < 5) {
          //   this.textAreaConfig.options.push({ id: tempinitialFormData.themes.length+1, name: null})
          // }
        })
  }
  checkStatus() {
    if (this.initialFormData.themes.length) {
      this.status = "done"
    }
  }
  handleSubmit() {
    this.checkStatus()
    this.initialFormData.themes = this.initialFormData.themes.filter( theme => theme.name !== null)
    this.initialFormData.themes.forEach( (theme, index) => { theme.id = index+1})
    let formData: FormTwo = {
      data: {
        themes:  this.initialFormData.themes,
      },
      status: this.status
    }
    this.buttonConfig.submitted = this.status == 'done'
    this.onSubmit.emit(formData)
  }
  textAreaUpdate(data){
    (data.val[0].name === null || data.val[0].name === undefined || data.val[0].name.length == 0)? this.buttonConfig.disabled = true: this.buttonConfig.disabled = false
  }
  addTheme(data){
    this.initialFormData.themes=data.val
    this.initialFormData.themes.forEach( (theme, index) => { theme.id = index+1})
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
