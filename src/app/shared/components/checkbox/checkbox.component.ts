import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core'
import { CheckBoxColumn, CheckBoxData } from 'src/app/shared/constants/checkbox.model'

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
  scrollBodyWidth: number
  hostWidth: number
  colCount: number
  widthDifference: number

  constructor(
    private elRef: ElementRef
  ) { }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
    this.checked.emit()
  }

  adjustScrollWidth(): void{
    if (this.isHead === true && this.scrollBody) {
        this.hostWidth = this.elRef.nativeElement.scrollWidth
        this.scrollBodyWidth = this.scrollBody.scrollWidth
        this.widthDifference = this.hostWidth - this.scrollBodyWidth + 16
    }
  }

}
