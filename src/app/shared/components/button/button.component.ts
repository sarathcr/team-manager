import { Component, HostBinding, Input } from '@angular/core'

import {
  ButtonIcon,
  ButtonSize,
  ButtonType,
  ButtonVariants,
  Theme,
} from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() theme: Theme = 'primary'
  @Input() disabled: boolean
  @Input() variant: ButtonVariants = 'contained'
  @Input() icon: ButtonIcon
  @Input() size: ButtonSize = 'default'
  @Input() buttonType: ButtonType = 'button'
  @Input() loading: boolean
  @HostBinding('class.disabled') get t(): boolean {
    return this.disabled || this.loading
  }
  constructor() {}
}
