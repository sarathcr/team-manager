import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Input() value: string
  @Input() placeholder: string
  @Input() maxlength: number
  @Output() inputChange = new EventEmitter()
  focus = false

  constructor() { }

  ngOnInit(): void {
  }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    if ((this.isFirefox() || this.isEdge()) && value.length > this.maxlength) {
      value = value.substring(0, this.maxlength)
    }
    this.value = value
    this.inputChange.emit(value.trim())
  }

  onKeyDown(event): void {
    const text = event.target.value
    if (this.isEdge() && event.keyCode === 13 && text.length > this.maxlength - 1) {
      event.preventDefault()
    }
  }

  setFocus(): void {
    this.focus = true
  }

  onBlur(): void {
    this.focus = false
    if (!this.value.trim()) {
      this.value = ''
      this.inputChange.emit('')
    }
  }

  // function to check the browser is Firefox
  isFirefox(): boolean {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    return isFirefox
  }

  // function to check the browser is Edge
  isEdge(): boolean {
    const isEdge = navigator.userAgent.toLowerCase().indexOf('edge') > -1
    return isEdge
  }

}
