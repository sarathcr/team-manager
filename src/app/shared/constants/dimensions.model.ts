import { SpecificSkills } from './specificskills.model'

export interface Dimensions {
    id: number
    name: string
    description: string
    specificSkills: SpecificSkills[]
}
