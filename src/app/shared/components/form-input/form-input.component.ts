import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
// Interfaces
import { Field, FieldConfig} from '../../constants/field.model';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements Field {

  config: FieldConfig;
  group: FormGroup;

}
