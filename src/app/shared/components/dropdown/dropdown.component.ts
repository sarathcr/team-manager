import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core'
// Interfaces
import { DropDownConfig, Option } from '../../constants/field.model'
import { IDropdownSettings } from 'ng-multiselect-dropdown'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
  @Output() dropdownSelect: EventEmitter<any> = new EventEmitter()
  @Input() config: DropDownConfig
  @Input() canDeselect = true
  active = false
  dropdownSettings: IDropdownSettings = {}
  constructor() { }

  ngOnInit(): void {

    this.dropdownSettings = {
      ...this.config.settings,
      itemsShowLimit: 4,
      closeDropDownOnSelection: true,
      maxHeight: 265,
      enableCheckAll: false,
    }
  }

  onItemSelect(): void {
    this.active = true
    this.dropdownSelect.emit({controller: this.config.name, val: this.config.selectedItems})
  }

  onItemDeSelect(item: Option): void {
    if (this.canDeselect) {
      this.active = true
      this.dropdownSelect.emit({controller: this.config.name, val: this.config.selectedItems})
    }
    else {
      this.config.selectedItems = [{...item}]
    }
  }

  onDropDownClose(): void{
    this.active = false
  }
}
