import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder: string
  @Input() maxlength: number
  @Input() value: string
  @Output() onChange = new EventEmitter()
  config: FieldConfig;
  group: FormGroup;
  focus = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Function to get and emit value on textarea
  onValueChange(value: string) {
    this.value = value;
    this.onChange.emit(value.trim());
  }

  setFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
    if (!this.value.trim()) {
      this.value = '';
      this.onChange.emit('');
    }
  }
}
