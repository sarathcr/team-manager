import { CheckBoxData } from './checkbox.model'


export interface BasicSkills {
    id: number
    code: string
    description: string
    name: string
    checkData?: CheckBoxData
}
export interface Curriculum {
  id: number
  name: string
  basicSkills?: BasicSkills[]
}
