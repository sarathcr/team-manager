import {
  Contents,
  CustomStudentGroup,
  CustomTeachingStrategy,
  StudentGroup,
  TeachingStrategy,
} from '../../modules/activity/constants/model/form-elements.model'
import { Standard, Subject } from './project.model'

export class Activity {
  id?: number | string
  name?: string
  duration?: number
  exercises?: Exercice[]
  state?: ActivityState
  phase?: string
  description?: string
  resources?: ActivityResource[]
  diversity?: string
  activityImageUrl?: string
  modality?: string
  contents?: Contents[]
  objectives?: any[]
  standards?: Standard[]
  studentGroups?: StudentGroup[]
  subjects?: Subject[]
  customTeachingStrategies?: CustomTeachingStrategy[]
  customStudentGroups?: CustomStudentGroup[]
  teachingStrategies?: TeachingStrategy[]
  referenceMaterials?: ReferenceMaterials[]
  updateType?: string
  projectId?: number
  instructions?: string
}

export class Content {
  type?: string
  title?: string
  url?: string
  image?: string
}

export class Exercice {
  id?: number
  name?: string
}
export class ReferenceMaterials {
  id?: number
  fileName?: string
  fileType: FileType
  previewImageUrl: string
  sourceType: string
  title: string
  url: string
  visible: boolean
}

export class ActivityResource {
  id?: number
  name?: string
}

export type ActivityPhase = 'INITIAL' | 'DEVELOP' | 'SYNTHESIS'
export type ActivityState = 'TO_DEFINE' | 'DEFINED' | 'CREATED' | 'PUBLISHED'
export type Modality = 'PRESENCIAL' | 'ONLINE'
export type FileType =
  | 'PRESENTATION'
  | 'DOCUMENT'
  | 'WEB'
  | 'FORMULA'
  | 'TABLES'
export type SourceType = 'GOOGLEDRIVE' | 'LOCALDRIVE' | 'WEB'
export type UpdateType = 'clone' | 'update' | 'delete'
