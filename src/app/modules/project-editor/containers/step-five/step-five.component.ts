import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EditorService } from '../../services/editor/editor.service'
import { Step } from '../../constants/step.model'
import { Project } from '../../constants/project.model'
import { SubSink } from '../../../../shared/utility/subsink.utility'; import { FieldConfig } from 'src/app/shared/constants/field.model'
@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  project$: Observable<Project>
  step: Step
  step$: Observable<Step>
  subscriptions = new SubSink()
  buttonConfig: FieldConfig
  project: Project

  constructor(private editor: EditorService) { } ngOnInit(): void {
    this.stepInIt()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(5)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        if (data) {
          console.log('competencyObjectives: ', data.competencyObjectives)
          this.project = data
        }
      })
    }
  }
}
