import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'

@Component({
  selector: 'app-activity-editor-header',
  templateUrl: './activity-editor-header.component.html',
  styleUrls: ['./activity-editor-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityEditorHeaderComponent implements OnInit {
  @Input() title: string
  @Input() currentlyActive: string
  @Input() projectId: string
  @Input() activityId: string
  @Input() isDefinition = true
  @Input() experienceType = ''
  @Input() modality = ''
  @Input() initDate = ''
  @Input() endDate = ''
  @Input() status = 'PENDIENTE'
  @Input() hideFigureTop = false
  backUrl: string
  tabUrl: string

  ngOnInit(): void {
    this.backUrl = this.isDefinition
      ? `/editor/${this.experienceType}/${this.projectId}/activities`
      : `/editor/${this.experienceType}/${this.projectId}/activity/${this.activityId}/creation`

    this.tabUrl = `/editor/${this.experienceType}/${this.projectId}/activity/${this.activityId}/`
  }
}
