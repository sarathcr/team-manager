import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../../constants/step.model';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { Theme } from 'src/app/shared/constants/theme.model';
import { EditorService } from '../../services/editor/editor.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  buttonConfig : FieldConfig
  textAreaConfig: FieldConfig
  themes$: Observable<Theme[]>
  
  constructor(private editor: EditorService) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.formInit()
  }

  formInit() {
    this.project$ = this.editor.getStepData('stepThree');
    this.step = this.editor.steps.three;
    this.step$ = this.editor.getStepStatus(3);
  }

  createFormConfig() {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA',
      variant: {outlined:true}
    };
    this.textAreaConfig = {
      name: 'textarea',
      field: 'themes',
      id: 'themes',
      maxLength: 150,
      limit: 5
    }
  }

}
