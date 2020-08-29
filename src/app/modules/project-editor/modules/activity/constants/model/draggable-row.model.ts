export interface DraggableRow {
  id: number | string
  url: string
  columnOne: DraggableColumn
  columnTwo: DraggableColumn
  columnThree: DraggableColumn
  columnFour: DraggableColumn
  columnFive: DraggableColumnFive
  dropdownElements?: DropdownElement[]
  action?: string
}

export interface DraggableColumn {
  icon?: string
  text: string
  disabled?: boolean
}
export interface DraggableColumnFive extends DraggableColumn {
  step: number
}

export interface DropdownElement {
  icon: string
  text: string
  action: string
}
