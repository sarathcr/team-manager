import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {

  @Input() variant: 'block'

  constructor() { }

}
