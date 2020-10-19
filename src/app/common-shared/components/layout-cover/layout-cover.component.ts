import { Component, Input } from '@angular/core'
import { LayoutVariant } from '../../constants/model/layout.model'

@Component({
  selector: 'app-layout-cover',
  templateUrl: './layout-cover.component.html',
  styleUrls: ['./layout-cover.component.scss'],
})
export class LayoutCoverComponent {
  @Input() img: string
  @Input() variant: LayoutVariant = 'auth'
  constructor() {}
}
