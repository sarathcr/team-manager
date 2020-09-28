import { Location } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'

@Component({
  selector: 'app-activity-editor-header',
  templateUrl: './activity-editor-header.component.html',
  styleUrls: ['./activity-editor-header.component.scss'],
})
export class ActivityEditorHeaderComponent implements OnInit {
  @Input() title: string
  @Input() currentlyActive: string
  @Input() projectId: string
  @Input() activityId: string
  backUrl: string
  tabUrl: string

  constructor(private location: Location, private editor: EditorService) {}

  ngOnInit(): void {
    const experinceType = this.editor.getExperienceUrl()
    this.backUrl = `/editor/${experinceType}/${this.projectId}/activities`
    this.tabUrl = `/editor/${experinceType}/${this.projectId}/activity/${this.activityId}/`
  }
}
