import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import {
  AcademicYear,
  BasicSkill,
  Content,
  Country,
  CustomContent,
  EvaluationCriteria,
  Grade,
  Region,
  Standard,
  Subject,
} from 'src/app/modules/shared/constants/model/curriculum-data.model'
import { Activity, Exercise, Order } from './activity.model'

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
  didacticSeqDuration?: number
  stage?: string
  state?: string
  activities?: Activity[]
  curriculumId?: number
  type?: Type
  error?: Error
  jwt?: string
  userId?: number
}

export class ProjectUpdate extends Project {
  updateType?: ProjectUpdateTypes
  subjectId?: number
  contentId?: number
  competencyObjectiveId?: number
  standardId?: number
  criteriaId?: number
  activityId?: number | string
  exerciseId?: number | string
  exercise?: Exercise
  sortOrder?: Order
}
export class ProjectStoreUpdate {
  id?: number
  changes: ProjectUpdate
}
export class ProjectSort extends Option {
  type: ProjectSortType
}

export type ProjectUpdateTypes =
  | 'removeStandard'
  | 'removeCriteria'
  | 'removeContent'
  | 'updateActivity'
  | 'cloneAvtivity'
  | 'deleteActivity'
  | 'createActivity'
  | 'createExercise'
  | 'updateExercise'
  | 'sortOrderActivity'
  | 'sortOrderExercise'
  | 'deleteExercise'

export type ProjectSortType = 'openedAt' | 'updatedAt' | 'title' | 'createdAt'
export class ProjectList {
  projects: Project[]
  projectCount: number
  pageId: string
  pageSize: number
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
export class CommonThread {
  id?: number
  name?: string
}

export class CustomStandard {
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

export interface Error {
  contents: Content[]
  customContents: CustomContent[]
  customStandards: CustomStandard[]
  description: string
  standards: Standard[]
  type: ProjectErrorType
}

export type ProjectId = number
export type statusId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Status = 'INPROCESS' | 'DONE' | 'PENDING'

export function compareProjects(p1: Project, p2: Project): number {
  const firstTimestamp = new Date(p1?.createdAt).getTime()
  const secondTimestamp = new Date(p2?.createdAt).getTime()
  const compare = firstTimestamp - secondTimestamp
  if (compare > 0) {
    return -1
  } else if (compare < 0) {
    return 1
  } else {
    return 0
  }
}

export type Type = 'PROJECT' | 'ACTIVITY' | 'DIDACTIC_UNIT'

export type ProjectErrorType =
  | 'NONE'
  | 'TITLE'
  | 'SUBJECT'
  | 'EVALUATION'
  | 'COMPTETENCY'
  | 'CURRICULUM'
  | 'COMPTETENCY_ACTIVITY'
  | 'CONTENT_ACTIVITY'
  | 'STANDARD_ACTIVITY'
