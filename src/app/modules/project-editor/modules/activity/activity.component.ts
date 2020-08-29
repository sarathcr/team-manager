import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { SubSink } from '../../../../shared/utility/subsink.utility'
import { EditorService } from '../../services/editor/editor.service'
import { ActivityEditorService } from './services/activity-editor.service'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  loaded$: Observable<boolean>
  subscriptions = new SubSink()
  constructor(
    private activityEditor: ActivityEditorService,
    public editor: EditorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id')
    this.editor.createSteps()
    // this.editor.getProject(projectId)
    this.activityEditor.getProject(projectId) // To be removed and uncomment above line
    this.activityEditor.getActivities(+projectId)
    this.loaded$ = this.editor.loaded$
  }
  ngOnDestroy(): void {
    this.activityEditor.clearData()
  }
}
