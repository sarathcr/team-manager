import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';

@Component({
  selector: 'app-step-unlock',
  templateUrl: './step-unlock.component.html',
  styleUrls: ['./step-unlock.component.scss']
})
export class StepUnlockComponent implements OnInit {

  buttonConfig : FieldConfig
  textAreaConfig: FieldConfig
  
  constructor() { }

  ngOnInit(): void {
    this.createFormConfig()
  }

  createFormConfig() {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: false,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA'
    };
    this.textAreaConfig = {
      name: 'textarea',
      field: 'themes',
      id: 'themes',
      maxLength: 150,
      limit: 5
    }
  }

}
