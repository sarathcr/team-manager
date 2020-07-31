import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() filename = ''
  @Input() currentPage: number
  @Input() totalPages: number
  @Input() zoomAmt: number
  @Input() zoomMax: number
  @Input() zoomMin: number
  @Input() loading: boolean
  @Output() setZoom: EventEmitter<any> = new EventEmitter()
  @Output() download: EventEmitter<any> = new EventEmitter()
  @Output() print: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  zoom(type: string): void{
    this.setZoom.emit(type)
  }

  onDownload(event: any): void{
    event.currentTarget.querySelector('button').blur()
    this.download.emit()
  }

  onPrint(event: any): void{
    event.currentTarget.querySelector('button').blur()
    this.print.emit()
  }
}
