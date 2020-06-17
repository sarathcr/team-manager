import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../../constants/step.model';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { Theme } from 'src/app/shared/constants/theme.model';
import { EditorService } from '../../services/editor/editor.service';
import { TranslateService } from '@ngx-translate/core';

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
  
  constructor(private translateService: TranslateService,private editor: EditorService) { }

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
      variant: {outlined:false}
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

}
