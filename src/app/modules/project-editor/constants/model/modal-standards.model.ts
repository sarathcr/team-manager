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

export interface ModalTableData {
  colTwoData: string
  colOneHeadData: string
  colTwoHeadData: string
}

export interface GradeIndex {
  id?: number
  count: number
}
