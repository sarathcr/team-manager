import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() head: boolean = false
  @Input() checkbox: boolean = false
  @Input() cellData: Array<object> = []
  isChecked: boolean
  colCount: number

  constructor() { }

  ngOnInit(): void {
    this.initRow()
  }

  initRow(){
    console.log(this.head,this.checkbox,this.cellData);
    this.colCount = Math.floor(12 / this.cellData.length);
  }

  onChange(checked:boolean){
    console.log(checked);
  }
}
