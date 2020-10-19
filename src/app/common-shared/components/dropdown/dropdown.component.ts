import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import {
  DropdownElement,
  DropdownListPosition,
} from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
  @Input() list: DropdownElement[]
  @Input() position: DropdownListPosition = 'right'

  @Output() selects: EventEmitter<any> = new EventEmitter()

  showDropdown = false

  constructor() {}

  onSelect(elementSelected: DropdownElement): void {
    this.selects.emit(elementSelected)
  }

  isOpenChange(): void {
    this.showDropdown = !this.showDropdown
  }
}
