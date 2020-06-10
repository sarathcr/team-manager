import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  config: FieldConfig;
  group: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
