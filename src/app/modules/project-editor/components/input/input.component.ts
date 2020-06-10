import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/shared/constants/field.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder: string
  config: FieldConfig;
  group: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
