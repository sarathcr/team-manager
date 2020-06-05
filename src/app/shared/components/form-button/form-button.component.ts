import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FieldConfig } from '../../constants/field.model'

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {
  @Input() config: FieldConfig
  @Output() onClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  handleClick() {
    this.onClick.emit()
  }
}
