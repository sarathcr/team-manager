import { Component, Input, Output, EventEmitter } from '@angular/core'

import { CheckBoxData, CheckBoxColumn } from '../../constants/model/field.model'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckBoxComponent {
  @Input() isHead = false
  @Input() checkboxData: CheckBoxData
  @Input() parentID: number
  @Input() colOne: CheckBoxColumn
  @Input() colTwo: CheckBoxColumn
  @Input() colThree: CheckBoxColumn
  @Input() colFour: CheckBoxColumn
  @Input() checkedOnly = false
  @Output() checked: EventEmitter<any> = new EventEmitter()

  constructor() { }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
    this.checked.emit()
  }
}
