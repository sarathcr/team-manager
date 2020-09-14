import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number
  @Input() itemsPerPage: number
  @Input() currentPage: number
  @Input() disabled: boolean
  @Input() maxSize: number
  @Output() pageChanged: EventEmitter<any> = new EventEmitter()
  rotate = true
  status = 'ON'
  lastPage: number
  constructor() {}

  ngOnInit(): void {
    this.getLastPage()
  }

  onPageChanged($event: any): void {
    this.pageChanged.emit($event)
  }

  getLastPage(): void {
    this.lastPage = this.totalItems / this.itemsPerPage
    if (this.lastPage % 1 !== 0) {
      this.lastPage = Math.trunc(this.lastPage) + 1
    }
  }
}
