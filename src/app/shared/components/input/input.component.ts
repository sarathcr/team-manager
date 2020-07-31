import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
} from '@angular/core'
import { FormGroup } from '@angular/forms'

import {
  FieldConfig,
  InputVariant,
} from 'src/app/shared/constants/model/form-elements.model'

import { isNonFunctionalKey } from '../../utility/keyboard.utility'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() placeholder = ''
  @Input() maxlength: number
  @Input() value: string
  @Input() label: string
  @Input() variant: InputVariant
  @Input() initFocus = false
  @Input() enableValidator = false
  @Input() helperText: string
  @Input() errorText: string
  @Input() error: boolean
  @Output() inputChange = new EventEmitter()
  config: FieldConfig
  group: FormGroup
  focus = false
  tempTitle: string
  showInputfield = true
  toggle = true
  @ViewChildren('titleInput') titleInput: QueryList<ElementRef>

  constructor() {}

  ngOnInit(): void {
    this.focusInput()
  }

  validateEmailRegex(email: string): boolean {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(String(email).toLowerCase())
  }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    this.value = value
    if (this.variant === 'email') {
      this.inputChange.emit(this.validateEmailRegex(value) ? value.trim() : '')
    } else {
      this.inputChange.emit(value.trim())
    }
  }

  setFocus($event: any, validator: any): void {
    this.focus = true
    if (this.enableValidator) {
      validator.valueChange($event)
      validator.setPrevLength()
    }
  }

  onBlur($event: any): void {
    if ($event.relatedTarget !== $event.target.nextSibling) {
      this.focus = false
    } else {
      $event.target.focus()
    }
    if (!this.value?.trim()) {
      this.value = ''
      this.inputChange.emit('')
    }
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
    if (this.enableValidator && isNonFunctionalKey(keyCode)) {
      validator.valueChange(value)
    }
  }
}
