import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-layout-cover',
  templateUrl: './layout-cover.component.html',
  styleUrls: ['./layout-cover.component.scss']
})
export class LayoutCoverComponent {

  @Input() img: string
  constructor() { }

}
