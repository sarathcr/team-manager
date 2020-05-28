import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {

  status: 'inprogress' | 'done' | 'pending' = "pending"
  buttonConfig: FieldConfig = {
    label: 'MARCAR COMO HECHO',
    name: 'submit',
    field: 'button',
    id: 'submitButton',
    disabled: false,
    submitted: false,
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
