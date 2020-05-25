import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Interfaces
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Output() formUpdate: EventEmitter<any> = new EventEmitter();
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
    this.formUpdate.emit({controller: this.config.name, val: this.config.selectedItems});
  }
  onItemDeSelect(item: any) {
    this.active = true;
    this.formUpdate.emit({controller: this.config.name, val: this.config.selectedItems});
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDropDownClose(){
    this.active = false;
  }
}
