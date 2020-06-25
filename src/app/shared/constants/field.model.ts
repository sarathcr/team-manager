import { FormGroup } from '@angular/forms'
import { ValidatorFn } from '@angular/forms'
import { IDropdownSettings } from 'ng-multiselect-dropdown'

export interface Field {
  config: FieldConfig
  group: FormGroup
}


export interface FieldConfig {
  disabled?: boolean
  label?: string
  successLabel?: string
  name: string
  options?: Array<{ id?: number; name?: string }>
  selectedItems?: Array<{ id: number; name: string }>
  placeholder?: string
  type?: string
  field: string
  validation?: ValidatorFn[]
  value?: any
  multiselect?: boolean
  submitted?: boolean
  id: string
  textField?: string
  maxLength?: number
  limit?: number,
}

export interface Option {
  id: number
  name: string
}
export interface DropDownConfig {
  id: string
  label?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  data?: Array<{ id?: number; name?: string }>
  priorityData?: Array<{ id?: number; name?: string }>
  selectedItems?: Array<{ id: number; name: string }>
  settings: IDropdownSettings
}
export type ButtonVariants = 'contained' | 'outlined' | 'text'

export type Theme = 'primary' | 'secondary'

export type TextAreaVariants = 'bullet' | 'number'
