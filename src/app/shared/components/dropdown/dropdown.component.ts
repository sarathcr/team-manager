import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
// Interfaces
import { FieldConfig } from '../../constants/field.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() config: FieldConfig;
  active = false;
  dropdownSettings: IDropdownSettings = {};
  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: !this.config.multiselect || false,
      textField: this.config.textField || 'name',
      itemsShowLimit: 3,
      closeDropDownOnSelection: true,
      maxHeight: 265,
      enableCheckAll: false,
    };
  }

  onItemSelect(item: any) {
    this.active = true;
    this.onSelect.emit({controller: this.config.name, val: this.config.selectedItems});
  }

  onItemDeSelect(item: any) {
    this.active = true;
    this.onSelect.emit({controller: this.config.name, val: this.config.selectedItems});
  }

  onDropDownClose(){
    this.active = false;
  }
}
