import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core'
import { CheckBoxColumn, CheckBoxData } from 'src/app/shared/constants/checkbox.model'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckBoxComponent implements AfterContentInit {
  @Input() isHead = false
  @Input() checkboxData: CheckBoxData
  @Input() parentID: number
  @Input() colOne: CheckBoxColumn
  @Input() colTwo: CheckBoxColumn
  @Input() colThree: CheckBoxColumn
  @Input() colFour: CheckBoxColumn
  @Input() checkedOnly = false
  @Input() scrollBody: Element
  @Output() checked: EventEmitter<any> = new EventEmitter()
  scrollBodyWidth: number

  colCount: number

  constructor() { }

  ngAfterContentInit(): void {
    this.adjustScrollWidth()
  }

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
