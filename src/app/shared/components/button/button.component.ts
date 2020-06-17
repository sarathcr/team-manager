import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FieldConfig, ButtonVariants, ButtonTheme } from '../../constants/field.model'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() theme: ButtonTheme = 'primary'
  @Input() disabled: boolean
  @Input() config: FieldConfig
  @Output() onClick = new EventEmitter()
  @Input() variant: ButtonVariants = 'contained'

  constructor() { }

  ngOnInit(): void {
  }
}
