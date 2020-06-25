import { EvaluationCriteria } from 'src/app/modules/project-editor/constants/project.model'
import { BasicSkills } from './basic-skill.model'
import { Standards } from './standard.model'
import { Dimensions } from './dimensions.model'

interface Content extends Standards {
  basicSkills: BasicSkills[]
}

export interface CriteriaWithSkills extends EvaluationCriteria {
  basicSkills: BasicSkills[],
  dimensions: Dimensions[]
}

export interface Block {
  id: number
  name: string
  numeration: number
  description: string
  evaluationCriteria: CriteriaWithSkills[]
  contents: Content[]
}
