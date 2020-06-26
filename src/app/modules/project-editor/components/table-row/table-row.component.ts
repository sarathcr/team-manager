import { Component, OnInit, Input  } from '@angular/core'

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() isHead = false
  @Input() checkboxData: CheckBoxData
  @Input() parentID: number
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
    console.log(checked)
  }

  onCheck(): void {
    if (this.checkboxData) {
      this.checkboxData.checked = !this.checkboxData.checked
    }
  }
}

// WIP To be Moved in to corresponding file while doing functionality
export interface TableColumn {
  value: string,
  size?: 'xs' | 'm' | 's'
}

export interface CheckBoxData {
  checked: boolean
}
