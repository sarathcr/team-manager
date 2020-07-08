import { Component, Input, Output, EventEmitter } from '@angular/core'

import { FormGroup } from '@angular/forms'

import { FieldConfig } from 'src/app/shared/constants/model/form-config.model'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() placeholder: string
  @Input() maxlength: number
  @Input() value: string
  @Output() inputChange = new EventEmitter()
  config: FieldConfig
  group: FormGroup
  focus = false

  constructor() { }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    this.value = value
    this.inputChange.emit(value.trim())
  }

  setFocus(): void {
    this.focus = true
  }

  onBlur(): void {
    this.focus = false
    if (!this.value.trim()) {
      this.value = ''
      this.inputChange.emit('')
    }
  }
}
