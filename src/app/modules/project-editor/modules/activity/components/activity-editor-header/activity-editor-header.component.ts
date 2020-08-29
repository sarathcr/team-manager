import { Location } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'

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

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.backUrl = `/editor/project/${this.projectId}/activities`
    this.tabUrl = `/editor/project/${this.projectId}/activity/${this.activityId}/`
  }
}
