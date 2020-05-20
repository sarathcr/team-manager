import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// Interfaces
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit, Field {
  config: FieldConfig;
  group: FormGroup;
  active = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  constructor() { }

  ngOnInit(): void {
    this.dropdownList  = this.config.options;
    this.dropdownSettings = {
      singleSelection: !this.config.multiselect || false,
      textField: 'value',
      itemsShowLimit: 3,
      // allowSearchFilter: true,
      closeDropDownOnSelection: true,
      maxHeight: 265,
      enableCheckAll: false
    };
  }
  onItemSelect(item: any) {
    this.active = true;
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDropDownClose(){
    this.active = false;
  }
}
