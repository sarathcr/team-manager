import { BasicSkills } from 'src/app/shared/constants/curriculum-basic-skill.model'
import { Option } from 'src/app/shared/constants/field.model'

export class Project {
  id?: number | null
  title?: string
  creativeTitle?: string
  creativeImage?: string
  name?: string
  finalProduct?: string
  synopsis?: string
  country?: Country
  region?: Region
  academicYear?: AcademicYear
  commonThreads?: Array<object>
  themes?: Theme[]
  drivingQuestions?: DrivingQuestion[]
  grades?: Array<Grade>
  subjects?: Array<Subject>
  createdAt?: string
  updatedAt?: string
  competencyObjectives?: CompetencyObjectives[]
  evaluationCriteria?: EvaluationCriteria[]
  basicSkills?: BasicSkills[]
}

export class Country {
  id: number
  name: string
}

export class Region {
  id: number
  name: string
  country?: Country
}

export class AcademicYear {
  id: number
  name?: string
  academicYear?: string
}

export class Grade {
  id: number
  name: string
  academicYear?: AcademicYear
  region?: Region
  subjectList?: Subject[]
}

export class Subject {
  id: number
  name: string
  academicYear?: AcademicYear
  region?: Region
  evaluationCriteria?: EvaluationCriteria[]
  contents?: any[]
}

export interface DrivingQuestion {
  id?: number
  name?: string
}

export class Theme {
  id?: number
  name?: string
}

export class CompetencyObjectives {
  id?: number
  name?: string
}
export class EvaluationCriteria {
  gradeId?: number
  id: number
  name: string
  subjectId?: number
  dimensions?: Option[]
  basicSkills?: Option[]
}

export function compareProjects(p1: Project, p2: Project): number {
  const firstTimestamp = new Date(p1?.createdAt).getTime()
  const secondTimestamp = new Date(p2?.createdAt).getTime()
  const compare = firstTimestamp - secondTimestamp
  if (compare > 0) {
    return -1
  }
  else if (compare < 0) {
    return 1
  }
  else { return 0 }
}
