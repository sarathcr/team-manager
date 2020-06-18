import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Steps } from '../../constants/step.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  projectUrl: string | number
  steps: Steps
  contextualStatus: boolean = false

  constructor(
    private route: ActivatedRoute,
    public editor: EditorService
  ) { }

  ngOnInit(): void {
    this.steps = this.editor.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.getProject(this.projectUrl)
  }

  ngOnDestroy(): void {
    this.editor.clearData()
  }

  getContextualStatus($event): void {
    this.contextualStatus = $event
  }
}
