import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Output() count = new EventEmitter<object>()
  @Input() isHead = false
  @Input() checkbox = false
  @Input() parentID = ''
  @Input() cellData: Array<object> = []
  @Input() isLastRow = false

  isChecked: boolean
  colCount: number

  constructor() { }

  ngOnInit(): void {
    this.initRow()
  }

  initRow(): void{
    this.colCount = Math.floor(12 / this.cellData.length)
  }

  onChange(checked: boolean): void{
    this.count.emit({ parentID : this.parentID, checked})
  }
}
