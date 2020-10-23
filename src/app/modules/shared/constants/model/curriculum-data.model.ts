import {
  CheckBoxData,
  Option,
} from 'src/app/common-shared/constants/model/form-elements.model'

export class Country extends Option {}

export class Region extends Option {
  country?: Country
}

export class AcademicYear {
  id: number
  name?: string
  academicYear?: string
  curriculumId?: number
}

export class CurriculumAcademicYear {
  curriculumId?: number
  academicYears?: AcademicYear[]
}

export class Grade extends Option {
  academicYear?: AcademicYear
  region?: Region
  subjectList?: Subject[]
  description?: string
}

export class Subject extends Option {
  academicYear?: AcademicYear
  region?: Region
  evaluationCriteria?: EvaluationCriteria[]
  contents?: Content[]
  customContents?: CustomContent[]
  grade?: Grade
  icon?: string
}

export class EvaluationCriteria extends Option {
  gradeId?: number
  subjectId?: number
  dimensions?: Dimensions[]
  basicSkills?: BasicSkill[]
  code?: string
  description?: string
  numeration?: number
  indicators?: Indicator[]
  standards?: Standard[]
  checked?: boolean
  blockid?: number
}

export class Content extends Option {
  basicSkills?: BasicSkill[]
  code?: string
  description?: string
  numeration?: number
  checked?: boolean
  subjectId?: number
  blockid?: number
}

export class CustomContent {
  id?: number
  name?: string
  checked?: boolean
  subjectId?: number
  type?: string
}

export class Dimensions extends Option {
  description?: string
  specificSkills?: SpecificSkills[]
}

export class BasicSkill {
  id?: number
  name?: string
  code?: string
  description?: string
  checkData?: CheckBoxData
}

export class Indicator extends Option {
  code: string
  description: string
  numeration: number
}
export class Standard {
  id?: number
  name?: string
  code?: string
  description?: string
  numeration?: number
  evaluationCriteria?: EvaluationCriteria
  checked?: boolean
}

export class SpecificSkills extends Option {
  description?: string
}
