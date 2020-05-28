import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';

@Component({
  selector: 'app-final-product',
  templateUrl: './final-product.component.html',
  styleUrls: ['./final-product.component.scss']
})
export class FinalProductComponent implements OnInit {

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
