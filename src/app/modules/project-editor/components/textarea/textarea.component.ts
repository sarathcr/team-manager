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
  browser = navigator.userAgent.toLowerCase();
  isFirefox = false;
  isEdge = false;
  

  constructor() { }

  ngOnInit(): void {
    this.isFirefox = this.browser.indexOf('firefox') > -1;
    this.isEdge = this.browser.indexOf('edge') > -1;
   }

  // Function to get and emit value on textarea
  onValueChange(value: string) {
    if ((this.isFirefox || this.isEdge) && value.length > this.maxlength) {
      value = value.substring(0, this.maxlength)
    }
    this.value = value;
    this.onChange.emit(value.trim());
  }

  onKeyDown(event): any {
    const text = event.target.value;
    if (this.isEdge && event.keyCode === 13 && text.length > this.maxlength) {
      event.preventDefault();
    }
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

}
