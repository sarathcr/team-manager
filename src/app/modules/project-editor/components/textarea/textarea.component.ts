import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() value: string
  @Output() onChange = new EventEmitter()
  @Output() onBlur = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  handleChange(value: string) {
    this.onChange.emit(value)
  }

  handleBlur(value: string) {
    this.onBlur.emit(value)
  }
}
