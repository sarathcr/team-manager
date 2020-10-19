import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { ActivityPreview } from '../../../constants/model/activity-preview.model'

@Injectable()
export class ActivityPreviewEntityService extends EntityCollectionServiceBase<
  ActivityPreview
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ActivityPreview', serviceElementsFactory)
  }
}
