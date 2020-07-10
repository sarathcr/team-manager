import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

import { Observable } from 'rxjs'

import { TextAreaVariants, TextareaSize } from 'src/app/shared/constants/model/form-config.model'
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  // @Input() value: string
  @Input() placeholder: string
  @Input() label: string
  @Input() maxlength: number
  @Input() size: TextareaSize
  @Input() variant: TextAreaVariants = 'default'
  @Input() toggleData = ''
  @Input() onInitFocus = false
  @Input() limit = 0
  @Input() value$: Observable<any>
  @Output() inputChange = new EventEmitter()
  focus = false
  initialValue: string
  value: string
  updated = false

  constructor() { }

  ngOnInit(): void {
    if (this.variant === 'default') {
      this.valueInit()
    }
  }

  valueInit(): void {
    if (this.value$) {
      this.value$.subscribe(data => {
        if (data) {
          this.value = data
          this.initialValue = data
        }
      })
      this.updated = false
      const status = this.value ? 'INPROCESS' : 'PENDING'
      this.inputChange.emit({ textValue: this.value, updated: this.updated, status })
    }
  }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    if ((this.isFirefox() || this.isEdge()) && value.length > this.maxlength) {
      value = value.substring(0, this.maxlength)
    }
    this.value = value
    this.updated = true
    const status = this.value.trim() ? 'INPROCESS' : 'PENDING'
    this.inputChange.emit({ textValue: value.trim(), updated: this.updated, status })
  }

  onKeyDown(event: any): void {
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
    if (!this.updated) {
      this.updated = this.initialValue !== this.value
    }
    if (!this.value?.trim()) {
      this.value = ''
      this.inputChange.emit({ textValue: '', updated: this.updated, status: 'PENDING' })
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
