import { BasicSkills } from './basic-skill.model'
import { Dimensions } from './dimensions.model'
import { Standards } from './standard.model'
import { Indicators } from './indicators.model'

export interface EvaluationCriteria {
    basicSkills: BasicSkills[]
    code: string
    description: string
    dimensions: Dimensions[]
    id: number
    indicators: Indicators[]
    name: string
    numeration: number
    standards: Standards[]
}
