import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() value: string
  @Input() placeholder: string
  @Input() maxlength: number
  @Output() onChange = new EventEmitter()
  constructor() { }

  ngOnInit(): void { }

  // Function to get and emit value on textarea
  onValueChange(value: string) {
    this.value = value;
    this.onChange.emit(value.trim());
  }

  onBlur() {
    if(!this.value.trim()) {
      this.value = '';
      this.onChange.emit('');
    }
  }

}
