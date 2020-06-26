import { IDropdownSettings } from 'ng-multiselect-dropdown'

export interface FieldConfig {
  disabled?: boolean
  label?: string
  successLabel?: string
  name: string
  placeholder?: string
  type?: string
  field: string
  value?: any
  submitted?: boolean
  id: string
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

export type Theme = 'primary' | 'secondary' | 'success'

export type TextAreaVariants = 'bullet' | 'number'
