import { EvaluationCriteria, BasicSkill, ContentsWithSkills } from './project.model'
import { Option } from 'src/app/shared/constants/model/form-elements.model'

export class Block {
  id: number
  name: string
  contents: ContentsWithSkills[]
  description: string
  evaluationCriteria: EvaluationCriteria[]
  numeration: number
  virtual: boolean
  subjectId?: number
  gradeId?: number
  colTwoHead?: string
  colOneHead?: string
  blockIndex?: number
}

export class Dimensions extends Option {
  description?: string
  specificSkills?: SpecificSkills[]
}

export class Indicator extends Option {
  code: string
  description: string
  numeration: number
}

export class SpecificSkills extends Option {
  description?: string
}

export interface Curriculum extends Option {
  basicSkills?: BasicSkill[]
}

interface Content extends Option {
  basicSkills: BasicSkill[]
}
