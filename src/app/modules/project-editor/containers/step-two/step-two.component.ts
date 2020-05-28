import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../../shared/constants/field.model';

@Component({
  selector: 'app-tematica',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
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
