import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DropdownElement } from 'src/app/common-shared/constants/model/form-elements.model'
import {
  DraggableRow,
  DropdownItem,
} from '../../constants/model/draggable-row.model'

@Component({
  selector: 'app-draggable-row',
  templateUrl: './draggable-row.component.html',
  styleUrls: ['./draggable-row.component.scss'],
})
export class DraggableRowComponent {
  @Input() element: DraggableRow
  @Input() dropdownData: DropdownElement

  @Output() actionEmited: EventEmitter<any> = new EventEmitter()

  constructor() {}

  actionEmit(elementSelected: DropdownItem): void {
    const action = elementSelected.action
    const elem = { ...this.element, action }
    this.actionEmited.emit(elem)
  }
}
