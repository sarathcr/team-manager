import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ControlValueAccessor } from '@angular/forms'
import { makeProvider } from '../../utility/form.utility'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [makeProvider(CheckboxComponent)],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() id
  @Input() isForm = false
  @Input() isChecked = false
  @Input() disabled = false
  @Output() changeEvent: EventEmitter<any> = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  onChange(_: any): void {}
  onBlur(_: any): void {}

  writeValue(obj: boolean): void {
    this.isChecked = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onChanged(_: any): void {
    if (!this.disabled) {
      this.isChecked = !this.isChecked
      if (this.isForm) {
        this.onChange(this.isChecked)
      }
    }
    this.changeEvent.emit({ id: this.id, checked: this.isChecked })
  }
}
