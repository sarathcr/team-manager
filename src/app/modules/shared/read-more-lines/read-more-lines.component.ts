import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-read-more-lines',
  templateUrl: './read-more-lines.component.html',
  styleUrls: ['./read-more-lines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadMoreLinesComponent {
  @Input() description: string
  readMoreOpen = false
  constructor() {}
}
