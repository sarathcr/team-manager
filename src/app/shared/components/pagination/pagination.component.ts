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
  constructor() {}

  ngOnInit(): void {
    this.getLastPage()
  }

  onPageChanged($event: any): void {
    this.pageChanged.emit($event)
  }

  getLastPage(): number {
    let lastPage = this.totalItems / this.itemsPerPage
    if (lastPage % 1 !== 0) {
      lastPage = Math.trunc(lastPage) + 1
    }
    return lastPage
  }
}
