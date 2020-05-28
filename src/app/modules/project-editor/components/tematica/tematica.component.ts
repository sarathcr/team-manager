import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../../shared/constants/field.model';

@Component({
  selector: 'app-tematica',
  templateUrl: './tematica.component.html',
  styleUrls: ['./tematica.component.scss']
})
export class TematicaComponent implements OnInit {

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
