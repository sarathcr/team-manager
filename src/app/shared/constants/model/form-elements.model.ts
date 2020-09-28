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
  type?: string
}

export class List {
  id?: number
  name?: string
  description?: string
  checked?: boolean
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
  | 'back'
  | 'underlined'

export type Theme = 'primary' | 'secondary' | 'teritiary' | 'success'

export type TextAreaVariants =
  | 'default'
  | 'bullet'
  | 'number'
  | 'toggle'
  | 'listItem'

export type TextareaSize = 'small' | 'medium'

export type TextareaBackground = 'white' | 'white-lilac'

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
  | 'left'
  | 'back'
  | 'calender'
  | 'three-dots'
  | 'three-shape'
  | 'alumno'

export type ButtonSize = 'small' | 'default' | 'medium'

export type ButtonType = 'button' | 'submit'

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

export interface PasswordComlexity {
  hasMinLength: boolean
  hasNumber: boolean
  hasUpperCase: boolean
  hasLowerCase: boolean
  isTouched?: boolean
}

export type ErrorType = 'danger' | 'info' | 'warning' | 'success'

export type InputVariant =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'tel'

export type ValidatorVariant = 'text' | 'counter' | 'password'

export type InputInnerLabel = 'hours'

export type InputBackground = 'white' | 'white-lilac'

export type DropdownListPosition = 'right' | 'left' | 'center'

export interface DropdownElement {
  icon?: Dropdownicon
  text: string
  action: string
}

export type Dropdownicon =
  | 'icon-ic_edit'
  | 'icon-ic_duplicate'
  | 'icon-ic_delete'
  | 'icon-ic_user'
  | 'icon-ic_copy'
