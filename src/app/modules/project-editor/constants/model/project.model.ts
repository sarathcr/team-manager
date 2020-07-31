import { Dimensions, Indicator } from './curriculum.model'
import { Option, CheckBoxData } from 'src/app/shared/constants/model/form-elements.model'

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
  commonThreads?: CommonThread[]
  themes?: Theme[]
  drivingQuestions?: DrivingQuestion[]
  grades?: Grade[]
  subjects?: Subject[]
  createdAt?: string
  updatedAt?: string
  competencyObjectives?: CompetencyObjective[]
  evaluationCriteria?: EvaluationCriteria[]
  basicSkills?: BasicSkill[]
}

export class ProjectList {
  projects: Project[]
  projectCount: number
  pageNumber: number
  pageSize: number
}

export class Country extends Option { }

export class Region extends Option {
  country?: Country
}

export class AcademicYear {
  id: number
  name?: string
  academicYear?: string
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
}

export interface DrivingQuestion {
  id?: number
  name?: string
}

export class Theme {
  id?: number
  name?: string
}

export class CompetencyObjective {
  id?: number
  name?: string
  customStandards?: CustomStandard[]
  standards?: Standard[]
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
}
export interface ProjectContent {
  basicSkills: BasicSkill[]
  code: string
  description: string
  id: number
  name: string
  numeration: number
}

export interface ContentModal {
  contents?: string
  basicSkills?: string
  course?: string
  block?: string
  checked?: boolean
}

export class BasicSkill {
  id?: number
  name?: string
  code?: string
  description?: string
  checkData?: CheckBoxData
}

export class CommonThread {
  id?: number
  name?: string
}

export class CustomStandard {
  id?: number
  name?: string
}

export class Standard {
  id?: number
  name?: string
  code?: string
  description?: string
  numeration?: number
  evaluationCriteria?: EvaluationCriteria
}

export class Content extends Option {
  basicSkills?: BasicSkill[]
  code?: string
  description?: string
  numeration?: number
}

export class Help {
  id: number
  body: string
  icon: string
  secondIcon: string
  title: string
}

export class ContextualHelp {
  helps: Help[]
  stepid: number
}

export class CustomContent {
  id?: number
  name?: string
}

export class ProjectTitle {
  id?: ProjectId
  title?: string
}

export class Step {
  id?: ProjectId
  readonly stepid: statusId
  readonly sectionid?: StepId
  state: Status
  name?: string
}
export class StepState {
  id?: ProjectId
  steps: Step[]
}

export class CriteriaWithSkills extends EvaluationCriteria {
  checked?: boolean
  colTwoData?: string
  colOneData?: string
  grade?: Grade
}

export interface ContentsWithSkills extends ProjectContent {
  checked?: boolean
  colTwoData?: string
  colOneData?: string
  grade?: Grade
}

export interface StandardsWithSkills extends Standard {
  checked?: boolean
  colTwoData?: string
  colOneData?: string
  colThreeData?: string
}

export type ProjectId = number
export type statusId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Status = 'INPROCESS' | 'DONE' | 'PENDING'
export type StepId = 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive' | 'stepSix' | 'stepSeven' | 'stepEight' | 'stepNine' | 'stepTen' | 'stepEleven'

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
