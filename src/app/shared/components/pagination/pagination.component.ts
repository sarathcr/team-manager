import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItems: number
  @Input() itemsPerPage: number
  @Input() currentPage: number
  @Input() disabled: boolean
  @Input() maxSize: number
  @Output() pageChanged: EventEmitter<any> = new EventEmitter()
  rotate = true
  status = 'ON'
  constructor() {}

  onPageChanged($event: any): void {
    this.pageChanged.emit($event)
  }
}
