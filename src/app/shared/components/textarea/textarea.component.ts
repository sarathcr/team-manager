import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'

import { Observable } from 'rxjs'

import {
  TextareaBackground,
  TextareaSize,
  TextAreaVariants,
} from 'src/app/shared/constants/model/form-elements.model'

import { isNonFunctionalKey } from '../../utility/keyboard.utility'
import { SubSink } from '../../utility/subsink.utility'
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit, OnDestroy {
  @Input() placeholder = ''
  @Input() label: string
  @Input() helperText: string
  @Input() errorText: string
  @Input() maxLength: number
  @Input() size: TextareaSize
  @Input() variant: TextAreaVariants = 'default'
  @Input() background: TextareaBackground = 'white'
  @Input() toggleData = ''
  @Input() initFocus = false
  @Input() lineLimit = 0
  @Input() value$: Observable<any>
  @Input() value: string
  @Input() enableValidator = false
  @Input() customClass: string
  @Output() inputChange = new EventEmitter()
  @Output() textareaFocus = new EventEmitter()
  @Output() textareaFocusOut = new EventEmitter()
  @ViewChild('textarea') textArea: ElementRef
  focus = false
  initialValue: string
  updated = false
  subscriptions = new SubSink()

  constructor() {}

  ngOnInit(): void {
    if (this.variant === 'default') {
      this.valueInit()
    }
    if (
      this.initFocus &&
      (this.variant === 'default' || this.variant === 'listItem')
    ) {
      setTimeout(() => {
        this.textArea.nativeElement.focus()
      }, 0)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  valueInit(): void {
    if (this.value$) {
      this.subscriptions.sink = this.value$.subscribe((data) => {
        if (data) {
          this.value = data
          this.initialValue = data
        }
      })
      this.updated = false
      const status = this.value ? 'INPROCESS' : 'PENDING'
      this.inputChange.emit({
        value: this.value,
        updated: this.updated,
        status,
      })
    }
  }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    if ((this.isFirefox() || this.isEdge()) && value.length > this.maxLength) {
      value = value.substring(0, this.maxLength)
    }
    this.value = value
    this.updated = true
    const status = this.value.trim() ? 'INPROCESS' : 'PENDING'
    if (this.variant === 'default') {
      this.inputChange.emit({
        value: value.trim(),
        updated: this.updated,
        status,
      })
    }
  }

  onKeyDown(event: any, errorOccured: boolean): void {
    const text = event.target.value
    if (this.variant === 'default') {
      if (
        this.isEdge() &&
        event.keyCode === 13 &&
        text.length > this.maxLength - 1
      ) {
        event.preventDefault()
      }
    } else if (event.keyCode === 13) {
      event.preventDefault()
      if (!errorOccured) {
        this.handleClick()
      }
    }
  }

  onKeyUp($event: any, validator: any): void {
    const keyCode = $event.keyCode
    const value = $event.target.value
    const textComponent = this.textArea.nativeElement
    const startPos = textComponent.selectionStart
    const endPos = textComponent.selectionEnd
    if (startPos === 0 && endPos === 0) {
      if ($event.keyCode === 8) {
        $event.preventDefault()
      }
    } else if (this.enableValidator && isNonFunctionalKey(keyCode)) {
      validator.valueChange(value, 'keyUp')
    }
  }

  onPaste($event: any, validator: any): void {
    const value = $event.clipboardData.getData('text/plain')
    let tempValue: string
    if (this.value?.length) {
      const textComponent = this.textArea.nativeElement
      const startPos = textComponent.selectionStart
      const endPos = textComponent.selectionEnd
      if (startPos !== endPos) {
        tempValue =
          this.value.slice(0, startPos) +
          value +
          this.value.slice(endPos, this.value.length)
      } else {
        tempValue =
          this.value.slice(0, startPos) +
          value +
          this.value.slice(startPos + 1, this.value.length)
      }
    } else {
      tempValue = value
    }
    validator.valueChange(tempValue, 'paste')
  }

  onDrop($event: any, validator: any): void {
    const value = $event.dataTransfer.getData('text/plain')
    let tempValue: string
    if (this.value?.length) {
      tempValue = this.value + value
    } else {
      tempValue = value
    }
    validator.valueChange(tempValue, 'drop')
  }

  setFocus(): void {
    this.focus = true
    this.textareaFocus.emit()
  }

  onBlur($event: any): void {
    if ($event.relatedTarget !== $event.target.nextSibling) {
      this.focus = false
    } else {
      $event.target.focus()
    }
    if (!this.updated && this.value$) {
      this.updated = this.initialValue !== this.value
    }
    if (!this.value?.trim()) {
      this.value = ''
      if (this.variant === 'default') {
        this.inputChange.emit({
          value: '',
          updated: this.updated,
          status: 'PENDING',
        })
      }
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

  handleClick(): void {
    if (!this.focus) {
      this.focus = true
      setTimeout(() => {
        this.textArea.nativeElement.focus()
      }, 0)
    }
    if (this.focus && this.value.trim()) {
      this.inputChange.emit({ name: this.value.trim() })
      this.value = ''
    }
  }

  setFocusOut($event: any): void {
    if (this.updated) {
      this.textareaFocusOut.emit($event)
      this.updated = false
    }
  }
}
