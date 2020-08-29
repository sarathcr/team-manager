import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Step } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-editor',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  loaded$: Observable<boolean>
  steps: Step[]
  contextualStatus = false

  constructor(public editor: EditorService) {}

  ngOnInit(): void {
    this.steps = this.editor.steps
    this.loaded$ = this.editor.loaded$
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }
}
