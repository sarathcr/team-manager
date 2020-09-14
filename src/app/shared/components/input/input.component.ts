import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms'

import {
  FieldConfig,
  InputVariant,
  PasswordComlexity,
} from 'src/app/shared/constants/model/form-elements.model'

import {
  InputBackground,
  InputInnerLabel,
} from '../../constants/model/form-elements.model'
import {
  makeProvider,
  validateEmailRegex,
  validatePasswordRegex,
  validPasswordCheck,
} from '../../utility/form.utility'
import { isNonFunctionalKey } from '../../utility/keyboard.utility'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [makeProvider(InputComponent)],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = ''
  @Input() maxlength: number
  @Input()
  get value(): string {
    return this.val
  }
  set value(val: string) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }
  @Input() label: string
  @Input() innerLabel: InputInnerLabel
  @Input() variant: InputVariant
  @Input() initFocus = false
  @Input() enableValidator = false
  @Input() helperText: string
  @Input() errorText: string
  @Input() error: boolean
  @Input() passwordValidator = false
  @Input() maxDate: Date
  @Input() minDate: Date
  @Input() isForm = false
  @Input() control: FormControl
  @Input() background: InputBackground = 'white'
  @Input() maxNumber: number
  @Input() showError = false
  @Output() inputChange = new EventEmitter()
  @Output() focusOut = new EventEmitter()
  val = ''
  config: FieldConfig
  group: FormGroup
  focus = false
  tempTitle: string
  showInputfield = true
  toggle = true
  input: string
  touched = false
  complexityControl: PasswordComlexity = {
    hasMinLength: false,
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    isTouched: false,
  }
  validField = false
  @ViewChildren('titleInput') titleInput: QueryList<ElementRef>

  constructor() {}

  ngOnInit(): void {
    this.focusInput()
  }

  onChange(_: any): void {}

  onTouch(_: any): void {}

  writeValue(_: any): void {}

  registerOnChange(fn: any): void {
    if (this.isForm) {
      this.onChange = fn
    }
  }
  registerOnTouched(fn: any): void {
    if (this.isForm) {
      this.onTouch = fn
    }
  }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    this.value = value
    if (this.isForm) {
      this.inputChange.emit(value)
    } else {
      if (this.variant === 'email') {
        this.inputChange.emit(validateEmailRegex(value) ? value.trim() : '')
      } else {
        this.inputChange.emit(value.trim())
      }
    }
    if (this.passwordValidator) {
      const validPassword = validPasswordCheck(value || '')
      this.complexityControl = {
        ...validPassword,
        isTouched: value && (this.control?.touched || this.focus),
      }
      this.validField = validatePasswordRegex(value)
    }
    if (this.minDate || this.maxDate) {
      const date: Date = new Date(value)
      const minValidation = this.minDate
        ? date.getTime() > this.minDate.getTime()
        : true
      const maxValidation = this.maxDate
        ? date.getTime() < this.maxDate.getTime()
        : true

      this.validField = minValidation && maxValidation
    }
    if (this.variant === 'number' && this.maxNumber) {
      this.validField = +this.value <= this.maxNumber
    }
  }

  setFocus(): void {
    this.focus = true
  }

  onBlur($event: any): void {
    if ($event.relatedTarget !== $event.target.nextSibling) {
      this.focus = false
    } else {
      $event.target.focus()
    }
    if (this.variant !== 'password' && !String(this.value)?.trim()) {
      this.value = ''
      this.inputChange.emit('')
    }
    this.onTouch($event)
  }
  // focus the Input initially
  focusInput(): void {
    if (this.initFocus) {
      setTimeout(() => {
        this.titleInput.first.nativeElement.focus()
      }, 0)
    }
  }

  handleKeyPress($event: any, validator: any): void {
    const keyCode = $event.keyCode
    const value = $event.target.value
    const inputComponent = this.titleInput.first.nativeElement
    const startPos = inputComponent.selectionStart
    const endPos = inputComponent.selectionEnd
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
      tempValue = this.getTextSelection(value)
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

  getTextSelection(value: string): string {
    let tempValue: string
    const inputComponent = this.titleInput.first.nativeElement
    const startPos = inputComponent.selectionStart
    const endPos = inputComponent.selectionEnd
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
    return tempValue
  }

  setFocusOut($event: any): void {
    this.focusOut.emit($event)
  }

  handleKeyDown($event: any): void {
    const value = $event.target.value
    if (
      this.variant === 'number' &&
      value?.length >= this.maxlength &&
      $event.keyCode !== 8 &&
      $event.keyCode !== 46
    ) {
      $event.preventDefault()
    }
  }
}
