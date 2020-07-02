import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckBoxComponent {
  @Input() isHead = false
  @Input() checkboxData: CheckBoxData
  @Input() parentID: number
  @Input() colOne: TableColumn
  @Input() colTwo: TableColumn
  @Input() colThree: TableColumn
  @Input() colFour: TableColumn
  @Input() checkedOnly = false
  @Output() checked: EventEmitter<any> = new EventEmitter()

  colCount: number

  constructor() { }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
    this.checked.emit()
  }

}
// WIP To be Moved in to corresponding file while doing functionality
export interface TableColumn {
  value: string,
  size?: 'xs' | 'm' | 's' | 'sm'
}

export interface CheckBoxData {
  checked: boolean,
  variant?: 'checkedOnly' | 'checkbox'
}
