import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Output() count = new EventEmitter<object>()
  @Input() isHead = false
  @Input() checkbox: CheckBox
  @Input() parentID = ''
  @Input() isLastRow = false
  @Input() colOne: TableColumn
  @Input() colTwo: TableColumn
  @Input() colThree: TableColumn
  @Input() colFour: TableColumn
  // @Input() block: TableColumn

  colCount: number

  constructor() { }

  ngOnInit(): void {
    this.initRow()
  }

  initRow(): void {
    // this.colCount = Math.floor(12 / this.cellData.length)
  }

  onChange(checked: boolean): void {
    this.count.emit({ parentID: this.parentID, checked })
  }

  onCheck(): void {
    if (this.checkbox) {
      this.checkbox.checked = !this.checkbox.checked
    }
  }
}

// WIP To be Moved in to corresponding file while doing functionality
export interface TableColumn {
  value: string,
  size?: 'xs' | 'm' | 's'
}

export interface CheckBox {
  checked: boolean
}
