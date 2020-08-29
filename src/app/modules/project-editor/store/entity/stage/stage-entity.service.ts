import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

@Injectable()
export class StageEntityService extends EntityCollectionServiceBase<string> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Stage', serviceElementsFactory)
  }
}
