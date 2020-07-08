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
  limit?: number,
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
  data?: Array<{ id?: number; name?: string }>
  priorityData?: Array<{ id?: number; name?: string }>
  selectedItems?: Array<{ id: number; name: string }>
  settings: IDropdownSettings
  canDeselect?: boolean
  status?: Status
}

export type ButtonVariants = 'contained' | 'outlined' | 'text'

export type Theme = 'primary' | 'secondary' | 'success'

export type TextAreaVariants = 'bullet' | 'number'

export type TextareaSize = 'small'

export type ButtonIcon = 'tick' | 'add' | 'locked'

export interface CheckBoxColumn {
  value: string,
  size?: 'xs' | 'm' | 's' | 'sm'
}

export interface CheckBoxData {
  checked: boolean,
  variant?: 'checkedOnly' | 'checkbox'
}

