import { Component, Input } from '@angular/core'
import { ButtonVariants, Theme } from '../../constants/field.model'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() theme: Theme = 'primary'
  @Input() disabled: boolean
  @Input() variant: ButtonVariants = 'contained'

  constructor() { console.log(this.theme) }

}
