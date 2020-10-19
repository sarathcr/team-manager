import { Component, Input, OnInit } from '@angular/core'
import {
  PasswordComlexity,
  ValidatorVariant,
} from '../../constants/model/form-elements.model'
@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss'],
})
export class ValidatorComponent implements OnInit {
  @Input() variant: ValidatorVariant = 'counter'
  @Input() value: string
  @Input() maxlength = 70
  @Input() isEnabled = true
  @Input() helperText: string
  @Input() errorText: string
  @Input() error = false
  @Input() passwordValidator = false
  @Input() complexityControl: PasswordComlexity
  @Input() validField = false

  prevLength: number
  limitExceeds = false
  timeout: any

  constructor() {}

  ngOnInit(): void {
    this.prevLength = this.maxlength
  }

  setPrevLength(): void {
    this.prevLength = this.value.length
  }

  valueChange($event: any, action: 'paste' | 'keyUp' | 'drop'): void {
    if (this.limitExceeds) {
      clearTimeout(this.timeout)
    }
    switch (action) {
      case 'paste': {
        if ($event.length > this.maxlength && this.isEnabled) {
          this.limitExceeds = true
          this.prevLength = this.maxlength
        }
        break
      }
      case 'drop': {
        if ($event.length > this.maxlength && this.isEnabled) {
          this.limitExceeds = true
          this.prevLength = this.maxlength
        }
        break
      }
      case 'keyUp': {
        if (
          (this.prevLength === $event.length &&
            $event.length === +this.maxlength) ||
          (this.validField && this.isEnabled)
        ) {
          this.limitExceeds = true
        } else if (this.limitExceeds === true) {
          this.limitExceeds = false
        }
        this.prevLength = $event.length
        break
      }
    }
    if (this.limitExceeds) {
      this.timeout = setTimeout(() => {
        this.limitExceeds = false
      }, 5000)
    }
  }
}
