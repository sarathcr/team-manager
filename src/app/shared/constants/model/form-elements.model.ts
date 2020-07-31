import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { Status } from 'src/app/modules/project-editor/constants/model/project.model'

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
  limit?: number
}

export class Option {
  id: number
  name: string
}

export interface DropDownConfig {
  id: string
  label?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  data?: Array<{ id?: number; name?: string }>
  priorityData?: Array<{ id?: number; name?: string }>
  selectedItems?: Array<{ id: number; name: string }>
  settings: IDropdownSettings
  canDeselect?: boolean
  status?: Status
}

export interface DropdownCustom {
  label: string
  priorityTitle: string
  normalTitle: string
  placeholder?: string
}

export type ButtonVariants =
  | 'contained'
  | 'outlined'
  | 'text'
  | 'icon'
  | 'block'

export type Theme = 'primary' | 'secondary' | 'success'

export type TextAreaVariants =
  | 'default'
  | 'bullet'
  | 'number'
  | 'toggle'
  | 'listItem'

export type TextareaSize = 'small'

export type ButtonIcon =
  | 'tick'
  | 'add'
  | 'locked'
  | 'view'
  | 'zoomIn'
  | 'zoomOut'
  | 'download'
  | 'print'
  | 'google'

export type ButtonSize = 'small' | 'default' | 'medium'
export interface CheckBoxColumn {
  value: string
  size?: 'xs' | 'm' | 's' | 'sm'
}

export interface CheckBoxData {
  checked: boolean
  variant?: 'checkedOnly' | 'checkbox'
}

export interface FieldEvent {
  value?: string
  values?: Option[]
  updated?: boolean
  status?: 'INPROCESS' | 'PENDING'
}

export type ErrorType = 'danger' | 'info' | 'warning' | 'success'

export type InputVariant = 'text' | 'email' | 'password'

export type ValidatorVariant = 'text' | 'counter'
