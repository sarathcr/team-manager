import { Component, OnInit, Input } from '@angular/core'
import { FieldConfig } from '../../models/field-config.interface'

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {
  @Input() config: FieldConfig
  constructor() { }

  ngOnInit(): void {
  }
}
