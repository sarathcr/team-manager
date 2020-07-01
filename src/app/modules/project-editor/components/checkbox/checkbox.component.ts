import { Component, Input  } from '@angular/core'

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

  colCount: number

  constructor() { }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
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
