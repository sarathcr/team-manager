import { Option } from 'src/app/shared/constants/model/form-elements.model'

export interface CompetencyModal {
  evaluationCriteria?: string
  basicSkills?: string
  course?: string
  block?: string
  dimension?: string
  checked?: boolean
}

export interface GradeOptionAndId {
  selectedGrades: Option[]
  gradeIds: number[]
}

export interface PrincipalModalColHead {
  key?: string
  value?: string
}

export interface PrincipalModalColData {
  colOneHead?: PrincipalModalColHead
  colTwoHead?: PrincipalModalColHead
  colThreeHead?: PrincipalModalColHead
  colFourHead?: PrincipalModalColHead
  colOneData?: string
  colTwoData?: string
  colThreeData?: string
  colFourData?: string
}

export interface TranslatePrincipalData {
  subjectTitle: string
  summaryTitle: string
  bodyTitle: string
  countText: string
  addButton: string
  selectedItem: string
  emptyTitle: string
  emptyDescription: string
  emptyButton: string
}

export interface ModalTableData {
  colTwoData: string
  colOneHeadData: string
  colTwoHeadData: string
}

export interface GradeIndex {
  id?: number
  count: number
}

