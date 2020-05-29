import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../../shared/constants/field.model';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'
import { Project } from 'src/app/shared/constants/project.model';
import { formTwoInitData } from '../../constants/step-forms.data'
import { FormTwoInitData, FormTwo } from '../../constants/step-forms.model';
import { TextareaField } from 'src/app/shared/constants/textareaField.modal';

@Component({
  selector: 'app-tematica',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  initialFormData: FormTwoInitData = new formTwoInitData
  status: 'inprogress' | 'done' | 'pending' = "pending"
  buttonConfig: FieldConfig = {
    label: 'MARCAR COMO HECHO',
    name: 'submit',
    field: 'button',
    id: 'submitButton',
    disabled: false,
    submitted: false,
  };
  textAreaConfig: TextareaField[];
  constructor() { }

  ngOnInit(): void {
    this.formInIt();
  }
  formInIt() {
    if (this.project$)
      this.project$
        .subscribe(data => {
          let tempinitialFormData = new formTwoInitData
          if (data?.themes) {
            this.initialFormData.themes = data.themes
            tempinitialFormData.themes.push({ ...data.themes })
            // this.getRegions(data.country.id)
          }
          this.initialFormData = tempinitialFormData;
          this.textAreaConfig=this.initialFormData.themes
          console.log(this.textAreaConfig)
        })
  }
  checkStatus() {
    if (this.initialFormData.themes.length) {
      this.status = "done"
    }
  }
  handleSubmit() {
    this.checkStatus()
    let formData: FormTwo = {
      data: {
        themes:  null,
      },
      status: this.status
    }
    this.buttonConfig.submitted = this.status == 'done'
    this.onSubmit.emit(formData)
  }
}
