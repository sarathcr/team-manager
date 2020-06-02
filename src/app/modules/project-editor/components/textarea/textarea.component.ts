import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() value: string
  @Output() onChange = new EventEmitter()
  valueModel: string
  constructor() { }

  ngOnInit(): void { }

  // Function to get and emit value on textarea
  onValueChange(value: string) {
    this.value = this.valueModel
    this.onChange.emit(value)
  }

}
