import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import {
  BasicSkill,
  EvaluationCriteria,
  Grade,
  Region,
} from 'src/app/modules/shared/constants/model/curriculum-data.model'
import { ContentsWithSkills, StandardsWithSkills } from './project.model'

export class BlockWithQuery {
  id: string
  blocks: Block[]
}

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
