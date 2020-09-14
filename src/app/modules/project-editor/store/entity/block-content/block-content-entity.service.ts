import { Injectable } from '@angular/core'

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'

import { Block } from '../../../constants/model/curriculum.model'

@Injectable()
export class BlockContentEntityService extends EntityCollectionServiceBase<
  Block
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('BlockContent', serviceElementsFactory)
  }
}
