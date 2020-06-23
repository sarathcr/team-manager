import { Component, Input } from '@angular/core'
import { FieldConfig, ButtonVariants, Theme } from '../../constants/field.model'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() theme: Theme = 'primary'
  @Input() disabled: boolean
  @Input() config: FieldConfig
  @Input() variant: ButtonVariants = 'contained'

  constructor() { }

}
