import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DraggableRow } from '../../constants/model/draggable-row.model'

@Component({
  selector: 'app-draggable-row',
  templateUrl: './draggable-row.component.html',
  styleUrls: ['./draggable-row.component.scss'],
})
export class DraggableRowComponent {
  @Input() element: DraggableRow
  @Output() action: EventEmitter<any> = new EventEmitter()

  showDropdown = false

  constructor() {}

  executeAction(element: DraggableRow, action: string): void {
    const elem = { ...element, action }
    this.action.emit(elem)
  }

  isOpenChange(): void {
    this.showDropdown = !this.showDropdown
  }
}
