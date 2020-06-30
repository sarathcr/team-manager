import { Component, OnInit } from '@angular/core'
import { EditorService } from '../../services/editor/editor.service'
import { Observable } from 'rxjs'
import { Project } from '../../constants/project.model'
import { Step } from '../../constants/step.model'
import { Option } from 'src/app/shared/constants/field.model'

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

  constructor(
    public editor: EditorService
  ) { }

  ngOnInit(): void {
    this.formInIt()
  }

  formInIt(): void {
    this.project$ = this.editor.getStepData(4)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
  }

}
