import { CheckBoxData } from 'src/app/modules/project-editor/components/checkbox/checkbox.component'

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
