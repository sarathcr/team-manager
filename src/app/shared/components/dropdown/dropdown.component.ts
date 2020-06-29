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
  @Input() getInitialData: boolean
  active = false
  dropdownSettings: IDropdownSettings = {}
  initialSelectedItems: any
  constructor() { }

  ngOnInit(): void {
    this.initialSelectedItems = [...this.config.selectedItems]
    this.dropdownSettings = {
      ...this.config.settings,
      itemsShowLimit: 4,
      closeDropDownOnSelection: true,
      maxHeight: 265,
      enableCheckAll: false,
    }
  }

  selectedValue(): any {
    if (this.getInitialData) {
      return this.initialSelectedItems.filter(item => this.config.selectedItems
                                      .map(selected => selected.id).includes(item.id))
    }
    return this.config.selectedItems
  }

  onItemSelect(): void {
    const val = this.selectedValue()
    this.active = true
    this.dropdownSelect.emit({controller: this.config.name, val })
  }

  onItemDeSelect(item: Option): void {
    if (this.canDeselect) {
      const val = this.selectedValue()
      this.active = true
      this.dropdownSelect.emit({controller: this.config.name, val })
    }
    else {
      this.config.selectedItems = [{...item}]
    }
  }

  onDropDownClose(): void{
    this.active = false
  }
}
