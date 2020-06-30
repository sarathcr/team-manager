import { Component, OnInit } from '@angular/core'
import { EditorService } from '../../services/editor/editor.service'
import { Observable } from 'rxjs'
import { Project } from '../../constants/project.model'
import { Step } from '../../constants/step.model'
import { Option, FieldConfig } from 'src/app/shared/constants/field.model'
import { TranslateService } from '@ngx-translate/core'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {

  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  project: Project
  loading = true
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  subscriptions = new SubSink()
  showTextarea = false

  constructor(
    public editor: EditorService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.formInIt()
  }

  formInIt(): void {
    this.project$ = this.editor.getStepData(4)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
  }

  createFormConfig(): void {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA'
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'competencyObjectives',
      id: 'competencyObjectives',
      maxLength: 150,
      limit: 0
    }

    // Translation
    this.subscriptions.sink = this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'OBJECTIVES.project_objectives_title',
      'OBJECTIVES.project_objectives_description'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
    })
  }

  toggleTextarea(): void{
    this.showTextarea = !this.showTextarea
  }

}
