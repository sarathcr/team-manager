import { Component, Input, HostBinding } from '@angular/core'
import { ButtonVariants, Theme, ButtonIcon } from '../../constants/field.model'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() theme: Theme = 'primary'
  @Input() disabled: boolean
  @Input() variant: ButtonVariants = 'contained'
  @Input() icon: ButtonIcon
  @HostBinding('class.disabled') get t(): boolean {
    return this.disabled
  }

  constructor() { }

}
