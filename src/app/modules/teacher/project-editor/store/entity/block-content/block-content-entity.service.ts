import { Injectable } from '@angular/core'

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

import { BlockWithQuery } from '../../../constants/model/curriculum.model'

@Injectable()
export class BlockContentEntityService extends EntityCollectionServiceBase<
  BlockWithQuery
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('BlockContent', serviceElementsFactory)
  }
}
