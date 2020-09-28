import { Option } from 'src/app/shared/constants/model/form-elements.model'
import {
  BasicSkill,
  ContentsWithSkills,
  EvaluationCriteria,
  Grade,
  Region,
  StandardsWithSkills,
} from './project.model'

export class Block {
  id: number
  name: string
  contents?: ContentsWithSkills[]
  description?: string
  evaluationCriteria?: EvaluationCriteria[]
  numeration: number
  virtual: boolean
  subjectId?: number
  gradeId?: number
  colTwoHead?: string
  colOneHead?: string
  blockIndex?: number
  standard?: StandardsWithSkills[]
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

export interface Curriculum {
  basicSkills?: BasicSkill[]
  decree?: string
  description?: string
  mandatoryDate?: string
  region?: Region
  stage?: string
  startDate?: string
  valid?: boolean
  id: number
  name?: string
  showBasicskill?: boolean
}

interface Content extends Option {
  basicSkills: BasicSkill[]
}

export class Stage {
  cycles?: Cycle[]
  description?: string
  id?: number
  name?: string
}

export class Cycle {
  description?: string
  id?: number
  name?: string
}

export class CurriculumGrade {
  gradeList: Grade[]
  id: number
  name: string
}
