import { Injectable } from '@angular/core'
import { Activity } from '../../../constants/model/activity.model'
import { EditorService } from '../../../services/editor/editor.service'
import { Order } from './../../../constants/model/activity.model'

@Injectable({
  providedIn: 'root',
})
export class ActivityEditorService {
  constructor(private editorService: EditorService) {}

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

  updateSortOrderActivity(activity: Activity, value: Order): void {
    this.editorService.handleActivitySubmit(
      {
        ...activity,
        updateType: 'sortOrder',
      },
      value
    )
  }
}
