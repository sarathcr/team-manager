import { Component, Input } from '@angular/core'
import { Comment, FeedbackIcon } from '../../constants/model/feedback.model'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  @Input() title: string
  @Input() placeholder = ''
  @Input() comments: Comment[]
  @Input() icon: FeedbackIcon
  @Input() disabled = false

  constructor() {}
}
