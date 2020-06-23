import { Component, OnInit, OnDestroy,  HostListener } from '@angular/core'
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
  contextualStatus = false
  leftPadding: string
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updatePaddingLeft()
  }

  constructor(
    private route: ActivatedRoute,
    public editor: EditorService
  ) { }

  ngOnInit(): void {
    this.steps = this.editor.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.getProject(this.projectUrl)
    this.updatePaddingLeft()
  }

  ngOnDestroy(): void {
    this.editor.clearData()
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }

  updatePaddingLeft(){
    const sidebarWidth = document.getElementById('project-editor-sidebar').clientWidth
    this.leftPadding = sidebarWidth + 'px'
  }
}
