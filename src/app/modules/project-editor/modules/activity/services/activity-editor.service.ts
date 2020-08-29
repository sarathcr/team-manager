import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SubSink } from '../../../../../shared/utility/subsink.utility'
import { Activity } from '../../../constants/model/activity.model'
import { Project } from '../../../constants/model/project.model'
import { EditorService } from '../../../services/editor/editor.service'

@Injectable({
  providedIn: 'root',
})
export class ActivityEditorService {
  projectId: number
  project: Project
  project$: Observable<Project>
  subscriptions = new SubSink()
  activities: Activity[]

  activities$: Observable<Activity[]>

  constructor(private editorService: EditorService) {}

  getProject(projectId: string | number): void {
    this.editorService.getProject(projectId)
    this.subscriptions.sink = this.editorService.project$.subscribe(
      (project) => {
        if (project) {
          this.projectId = project.id
          this.project = project
        }
      }
    )
  }

  getActivities(projectId?: number): void {
    this.project$ = this.editorService.project$
    this.activities$ = this.editorService.project$.pipe(
      map((project) => project?.activities)
    )
    this.subscriptions.sink = this.activities$.subscribe((activities) => {
      if (activities?.length) {
        this.activities = activities
      }
    })
  }

  updateActivity(activity: Activity): void {
    this.editorService.handleActivitySubmit({
      ...activity,
      updateType: 'update',
    })
  }

  addActivity(activity: Activity): void {
    this.editorService.handleActivitySubmit({
      ...activity,
      id: null,
      updateType: 'create',
    })
  }

  deleteActivities(activity: Activity): void {
    this.editorService.handleActivitySubmit({
      ...activity,
      updateType: 'delete',
    })
  }

  clearData(): void {
    this.subscriptions.unsubscribe()
  }
}
