import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlValueAccessor } from '@angular/forms'
import {
  CheckBoxColumn,
  CheckBoxData,
} from 'src/app/common-shared/constants/model/form-elements.model'
import { makeProvider } from 'src/app/common-shared/utility/form.utility'

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
  providers: [makeProvider(CustomCheckBoxComponent)],
})
export class CustomCheckBoxComponent implements ControlValueAccessor {
  @Input() isHead = false
  @Input() checkboxData: CheckBoxData
  @Input() parentID: number
  @Input() colOne: CheckBoxColumn
  @Input() colTwo: CheckBoxColumn
  @Input() colThree: CheckBoxColumn
  @Input() colFour: CheckBoxColumn
  @Input() changeBg = false
  @Input() clickableLabel = true
  @Output() checked: EventEmitter<any> = new EventEmitter()

  constructor() {}

  onChange: any = (_: any): void => {}

  onTouch: any = (_: any): void => {}

  writeValue(): boolean {
    return this.checkboxData.checked
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
    this.checked.emit()
  }
}
