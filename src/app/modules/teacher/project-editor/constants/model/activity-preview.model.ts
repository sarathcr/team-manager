import { typeVariant } from 'src/app/modules/shared/constants/model/material-card.model'
import { ActivityState, SourceType } from './activity.model'

export class ActivityPreview {
  id: number
  name: string
  startDate: string
  endDate: string
  modality: string
  state: ActivityState
  status: ActivityPreviewStatus
  instructions: string
  referenceMaterials: ReferenceMaterialPreview[]
  exercises: ExercisePreview[]
}

export class ReferenceMaterialPreview {
  id: number
  url: string
  title: string
  fileName: string
  visible: boolean
  previewImageUrl: string
  fileType: typeVariant
  sourceType: SourceType
  fileId: number
}

export class ExercisePreview {
  id: number
  name: string
  statement: string
  deliveryDate: string
  evaluation: boolean
  percentage: number
  delivery: string
  referenceMaterials: ReferenceMaterialPreview[]
}

export type ActivityPreviewStatus = 'PENDING' | 'COMPLETED'
