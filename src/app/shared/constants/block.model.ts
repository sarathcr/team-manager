import { Grade } from 'src/app/modules/project-editor/constants/project.model'
import { BasicSkills } from './basic-skill.model'
import { Standards } from './standard.model'
import { EvaluationCriteria } from './evaluation-criteria.model'

interface Content extends Standards {
  basicSkills: BasicSkills[]
}

export interface CriteriaWithSkills extends EvaluationCriteria {
  checked?: boolean
  colTwoData?: string
  colOneData?: string
  grade?: Grade
}

export interface Block {
  id: number
  name: string
  numeration: number
  description: string
  evaluationCriteria: CriteriaWithSkills[]
  contents: Content[]
  colTwoHead?: string
  colOneHead?: string
  virtual: boolean
  gradeId?: number
  subjectId?: number
  blockIndex?: number
}
