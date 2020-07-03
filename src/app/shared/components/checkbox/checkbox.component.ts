import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CheckBoxData, CheckBoxColumn } from '../../constants/checkbox.model'

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
  @Input() scrollBody: Element
  @Input() checkedOnly = false
  @Output() checked: EventEmitter<any> = new EventEmitter()

  colCount: number
  scrollBodyWidth: number

  constructor() { }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
    this.checked.emit()
  }

  adjustScrollWidth(): void{
    if (this.isHead === true && this.scrollBody) {
        this.scrollBodyWidth = this.scrollBody.scrollWidth
    }
  }

}
