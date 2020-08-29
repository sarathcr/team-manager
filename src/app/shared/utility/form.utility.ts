import { forwardRef } from '@angular/core'
import {
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { PasswordComlexity } from '../constants/model/form-elements.model'

export const makeProvider = (type: any): any => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => type),
  multi: true,
})

export const validateEmail = (formControl: FormControl): any => {
  return validateEmailRegex(formControl.value)
    ? null
    : {
        validateEmail: { valid: false },
      }
}

export const validatePassword = (formControl: FormControl): any => {
  const isValid = validatePasswordRegex(formControl.value)
  return isValid ? null : { validatePassword: { valid: false } }
}

export const validatePasswordRegex = (password: string): boolean => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return passwordRegex.test(String(password))
}

export const validPasswordCheck = (password: string): PasswordComlexity => {
  const minLength = 8
  const hasMinLength = password.length >= minLength
  const hasLowerCase = /[a-z]/.test(password)
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  return {
    hasMinLength,
    hasLowerCase,
    hasUpperCase,
    hasNumber
  }
}

export const validateEmailRegex = (email: string): boolean => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}
