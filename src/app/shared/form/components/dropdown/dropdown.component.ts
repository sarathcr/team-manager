import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Interfaces
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit, Field {
  @Output() getSelectedItem: EventEmitter<any> = new EventEmitter();
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
  active = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  constructor() { }

  ngOnInit(): void {
    this.dropdownList  = this.config.options;
    this.dropdownSettings = {
      singleSelection: !this.config.multiselect || false,
      textField: this.config.textField || 'name',
      itemsShowLimit: 3,
      closeDropDownOnSelection: true,
      maxHeight: 265,
      enableCheckAll: false
    };
  }
  onItemSelect(item: any) {
    this.active = true;
    this.getSelectedItem.emit(this.selectedItems);
  }
  onItemDeSelect(item: any) {
    this.active = true;
    this.getSelectedItem.emit(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDropDownClose(){
    this.active = false;
  }
}
