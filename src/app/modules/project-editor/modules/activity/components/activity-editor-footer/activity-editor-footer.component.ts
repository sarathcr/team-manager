import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-activity-editor-footer',
  templateUrl: './activity-editor-footer.component.html',
  styleUrls: ['./activity-editor-footer.component.scss'],
})
export class ActivityEditorFooterComponent implements OnInit {
  @Input() btnStatus: boolean
  @Input() isSubmitted: boolean
  @Input() doneButtonlabel = 'ACTIVITY_FOOTER.activity_footer_button_markdone'
  @Input() viewButtonLabel = 'ACTIVITY_FOOTER.activity_footer_button_view'
  @Input() viewButtonIcon = 'locked'
  @Output() submitButtonClick: EventEmitter<any> = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}
}
