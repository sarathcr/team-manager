import { Component, OnDestroy, OnInit } from '@angular/core'

import { ProjectEditorToastService } from './services/project-editor-toast/project-editor-toast.service'

import { ActivatedRoute } from '@angular/router'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { Type } from './constants/model/project.model'
import { EditorService } from './services/editor/editor.service'

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss'],
})
export class ProjectEditorComponent implements OnInit, OnDestroy {
  subscription = new SubSink()
  errors = []
  projectId: string | number

  constructor(
    public projectEditorToastService: ProjectEditorToastService,
    public editor: EditorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.errorToast()
    this.editor.createSteps(this.getExperienceType())
    this.subscription.sink = this.route.firstChild.params.subscribe((value) => {
      this.editor.getProject(value.id, this.getExperienceType())
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.editor.clearData()
  }

  errorToast(): void {
    this.subscription.sink = this.projectEditorToastService.error$.subscribe(
      (error) => {
        this.errors.push(error)
      }
    )
  }
  getExperienceType(): Type {
    return this.route.firstChild.snapshot.routeConfig.path.split(`/`)[0] ===
      'project'
      ? 'PROJECT'
      : this.route.firstChild.snapshot.routeConfig.path.split(`/`)[0] ===
        'didactic-unit'
      ? 'DIDACTIC_UNIT'
      : this.route.firstChild.snapshot.routeConfig.path.split(`/`)[0] ===
        'activity'
      ? 'ACTIVITY'
      : null
  }
}
