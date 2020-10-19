import { Component, Input } from '@angular/core'
import { sidebarIcon } from '../../constants/models/evaluation-sidebar.model'

@Component({
  selector: 'app-evaluation-sidebar',
  templateUrl: './evaluation-sidebar.component.html',
  styleUrls: ['./evaluation-sidebar.component.scss'],
})
export class EvaluationSidebarComponent {
  @Input() title = ''
  @Input() label = ''
  @Input() icon: sidebarIcon = 'user'
}
