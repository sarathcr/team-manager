import { Component, OnDestroy, OnInit } from '@angular/core'

import { ProjectEditorToastService } from './services/project-editor-toast/project-editor-toast.service'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss'],
})
export class ProjectEditorComponent implements OnInit, OnDestroy {
  subscription = new SubSink()
  errors = []
  constructor(public projectEditorToastService: ProjectEditorToastService) {}

  ngOnInit(): void {
    this.errorToast()
  }

  errorToast(): void {
    this.subscription.sink = this.projectEditorToastService.error$.subscribe(
      (error) => {
        this.errors.push(error)
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
