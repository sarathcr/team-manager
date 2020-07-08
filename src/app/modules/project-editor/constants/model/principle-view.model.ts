import { Option } from 'src/app/shared/constants/model/field.model'

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
