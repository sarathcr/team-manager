import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean
  label?: string
  successLabel?: string
  name: string
  options?: Array<{ id: number; name: string; }>
  selectedItems?: Array<{ id: number; name: string; }>
  placeholder?: string
  type?: string
  field: string
  validation?: ValidatorFn[]
  value?: any
  multiselect?: boolean
  submitted?: boolean
  id: string
  textField?: string
}
