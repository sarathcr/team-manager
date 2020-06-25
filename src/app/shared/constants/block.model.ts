import { EvaluationCriteria } from 'src/app/modules/project-editor/constants/project.model'
import { BasicSkills } from './basic-skill.model'
import { Standards } from './standard.model'

interface Content extends Standards {
  basicSkills: BasicSkills[]
}

export interface CriteriaWithSkills extends EvaluationCriteria {
  basicSkills: BasicSkills[]
}

export interface Block {
  id: number
  name: string
  numeration: number
  description: string
  evaluationCriteria: CriteriaWithSkills[]
  contents: Content[]
}
