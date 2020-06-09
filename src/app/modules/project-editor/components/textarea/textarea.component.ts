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
  focus = false;
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  constructor() { }

  ngOnInit(): void { }

  // Function to get and emit value on textarea
  onValueChange(value: string) {
    if (this.isFirefox && value.length > this.maxlength) {
      value = value.substring(0, this.maxlength)
    }
    this.value = value;
    this.onChange.emit(value.trim());
  }

  setFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
    if (!this.value.trim()) {
      this.value = '';
      this.onChange.emit('');
    }
  }

  onKeyDown(event): any {
    if (!!this.maxlength) {
      const text = event.target.value;
      if (text.length > this.maxlength) {
        // truncate excess text (in the case of a paste)
        this.value = (text.substring(0, this.maxlength));
        event.preventDefault();
      }
    }
  }
}
