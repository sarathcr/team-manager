import {
  Standard,
  Subject,
} from 'src/app/modules/shared/constants/model/curriculum-data.model'
import {
  Contents,
  CustomStudentGroup,
  CustomTeachingStrategy,
  StudentGroup,
  TeachingStrategy,
} from '../../modules/activity/constants/model/form-elements.model'

export class Activity {
  id?: number | string
  name?: string
  duration?: number
  exercises?: Exercise[]
  state?: ActivityState
  phase?: string
  description?: string
  resources?: ActivityResource[]
  diversity?: string
  activityImageUrl?: string
  modality?: string
  contents?: Contents[]
  customcontents?: Contents[]
  objectives?: any[]
  standards?: Standard[]
  customStandards?: Standard[]
  studentGroups?: StudentGroup[]
  subjects?: Subject[]
  customTeachingStrategies?: CustomTeachingStrategy[]
  customStudentGroups?: CustomStudentGroup[]
  teachingStrategies?: TeachingStrategy[]
  referenceMaterials?: ReferenceMaterials[]
  updateType?: string
  projectId?: number
  instructions?: string
  error?: any
  sortOrder?: number
}

export class LinkContent {
  type?: string
  title?: string
  url?: string
  imageUrl?: string
}

export class Exercise {
  id?: number
  name?: string
  delivery?: Modality
  deliveryDate?: string
  evaluation?: boolean
  referenceMaterials?: ReferenceMaterials[]
  evaluationStrategies?: EvaluationStrategy[]
  percentage?: number
  statement?: string
  updateType?: string
  error?: any
  isMaterialVisibiityChange?: boolean
  sortOrder?: number
  activityId?: number | string
}

export class ReferenceMaterials {
  id?: number
  fileId?: string
  fileName?: string
  fileType: FileType
  previewImageUrl: string
  sourceType: SourceType
  title: string
  url: string
  visible: boolean
  entityType?: entityType
}

export class EvaluationStrategy {
  agent: AgentType
  id: number
  instrument: ReferenceMaterials
  name?: string
}
export class StatusMaterial extends ReferenceMaterials {
  status: 'default' | 'loading' | 'success' | 'failed'
  callConfirm?: boolean
}

export class ActivityResource {
  id?: number
  name?: string
}

export class ActivityPhaseObject {
  INITIAL?: any[]
  DEVELOP?: any[]
  SYNTHESIS?: any[]
}

export class ActivityData {
  duration?: number
  activitiesCount?: number
  exercisesCount?: number
  intialPhase?: any[]
  developPhase?: any[]
  synthesisPhase?: any[]
}

export class Order {
  id: number | string
  sortOrder: number
}

export type ActivityPhase = 'INITIAL' | 'DEVELOP' | 'SYNTHESIS'
export type ActivityState = 'TO_DEFINE' | 'DEFINED' | 'CREATED' | 'PUBLISHED'
export type Modality = 'PRESENTIAL' | 'ONLINE' | 'NONE'
export type FileType =
  | 'PRESENTATION'
  | 'DOCUMENT'
  | 'WEB'
  | 'FORM'
  | 'SHEET'
  | 'RUBRICA'
  | 'CHECKLIST'
  | 'DIANA'
  | 'INSTRUMENTUPLOAD'
export type SourceType = 'GOOGLEDRIVE' | 'LOCALDRIVE' | 'WEB'
export type UpdateType = 'clone' | 'update' | 'delete'
export type AgentType =
  | 'NONE'
  | 'HETETOEVALUATION'
  | 'COEVALUATION'
  | 'SELFEVALUATION'

export type entityType = 'activity' | 'exercise' | 'instrument'
