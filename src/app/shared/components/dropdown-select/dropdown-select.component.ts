import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import {
  DropdownListPosition,
  Option,
} from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownSelectComponent implements OnInit {
  @Input() disabled = false
  @Input() data: Option[]
  @Input() selectedItems: Option[]
  @Input() placeholder = ''
  @Input() label = ''
  @Input() textField = 'name'
  @Input() position: DropdownListPosition = 'right' // other types have to be implemented on requirement
  @Input() noDataAvailablePlaceholder = ''
  @Input() maxHeight = 250
  @Input() multiSelection = false
  @Input() loading = false
  @Input() canDeselect = false
  @Input() defaultSelected = false
  @Output() dropdownSelect: EventEmitter<any> = new EventEmitter()
  dropdownSettings: IDropdownSettings = {}

  constructor() {}

  ngOnInit(): void {
    this.dropdownSettings = {
      textField: this.textField,
      singleSelection: !this.multiSelection,
      maxHeight: this.maxHeight,
      noDataAvailablePlaceholderText: this.noDataAvailablePlaceholder,
      closeDropDownOnSelection: true,
      enableCheckAll: false,
    }
    if (this.defaultSelected) {
      this.selectedItems = [{ ...this.data[0] }]
    }
  }

  onItemSelect(): void {
    if (!this.multiSelection) {
      this.dropdownSelect.emit(this.selectedItems[0])
    } else {
      this.dropdownSelect.emit(this.selectedItems)
    }
  }

  onItemDeSelect(item: Option): void {
    if (this.canDeselect) {
      this.dropdownSelect.emit(this.selectedItems)
    } else {
      if (!this.multiSelection) {
        this.selectedItems = [{ ...item }]
      } else {
        this.selectedItems = [...this.selectedItems, item]
      }
    }
  }
}
