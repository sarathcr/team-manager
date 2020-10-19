import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { TeachingStrategy } from '../../../modules/activity/constants/model/form-elements.model'

@Injectable()
export class TeachingStrategyEntityService extends EntityCollectionServiceBase<
  TeachingStrategy
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('TeachingStrategy', serviceElementsFactory)
  }
}
