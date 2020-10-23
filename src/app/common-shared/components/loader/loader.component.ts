import { Component, Input, ViewEncapsulation } from '@angular/core'
import {
  DetailVariant,
  LoaderSize,
  LoaderTheme,
  LoaderVariants,
} from '../../constants/model/loader.model'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent {
  @Input() variant: LoaderVariants = 'default'
  @Input() theme: LoaderTheme = 'primary'
  @Input() size: LoaderSize = 'large'
  @Input() detail = ''
  @Input() detailVariant: DetailVariant = 'primary'
  constructor() {}
}
