import { Component, Input, ViewEncapsulation } from '@angular/core'
import { LoaderVariants } from '../../constants/model/loader.model'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
  @Input() variant: LoaderVariants = 'default'

  constructor() {}
}
