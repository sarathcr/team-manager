import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
  exportAs: 'Form',
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges, OnInit {
  @Input() config: FieldConfig[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() formUpdate: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  get controls() { return this.config.filter(({field}) => field !== 'button'); }
  get changes() { console.log(this.form.valueChanges); return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
    this.controls.forEach(control => {
      this.form.get(control.name).valueChanges.subscribe(val => {
        const modifiedVal = {
          controller: control.id,
          val
        }
        this.formUpdate.emit(modifiedVal);
      });
    });
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls.filter((control) => !configControls.includes(control)).forEach((control) => this.form.removeControl(control));

      configControls.filter((control) => !controls.includes(control)).forEach((name) => {
        const config = this.config.find((control) => control.name === name);
        this.form.addControl(name, this.createControl(config));
      });
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.formSubmit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
}
