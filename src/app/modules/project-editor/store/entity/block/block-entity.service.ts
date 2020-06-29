import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { Block, BlockData } from 'src/app/shared/constants/block.model'

@Injectable()
export class BlockEntityService extends EntityCollectionServiceBase<BlockData> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Block', serviceElementsFactory)
  }
}
