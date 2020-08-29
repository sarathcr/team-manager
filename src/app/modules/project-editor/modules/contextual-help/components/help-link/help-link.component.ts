import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrls: ['./help-link.component.scss'],
})
export class HelpLinkComponent {
  @Input() title: string
  @Input() img: string
  @Input() url: string

  constructor() {}
}
