import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EditorService } from '../../services/editor/editor.service'
import { Step } from '../../constants/step.model'
import { Project, Subject } from '../../constants/project.model'

import { SubSink } from '../../../../shared/utility/subsink.utility'
import { FieldConfig } from 'src/app/shared/constants/field.model'

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
  project$: Observable<Project>
  project: Project
  step: Step
  step$: Observable<Step>
  subscriptions = new SubSink()
  loading = true

  constructor(private editor: EditorService) { }

  ngOnInit(): void {
    this.stepInIt()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(5)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    console.log('step: ', this.step)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        if (data) {
          console.log('competencyObjectives: ', data.competencyObjectives)
          this.project = data
          console.log('data: ', data)
        }
      })
    }
  }

  openModalWithComponent(subject: Subject): void {

  }
}
