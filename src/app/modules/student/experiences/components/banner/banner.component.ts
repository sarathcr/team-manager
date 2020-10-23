import { Location } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() imgUrl: string
  @Input() heading: string
  constructor(private location: Location) {}
  back(): void {
    this.location.back()
  }
}
