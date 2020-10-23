import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { CardList } from 'src/app/modules/shared/constants/model/card-experience.model'

@Injectable()
export class CardListEntityService extends EntityCollectionServiceBase<
  CardList
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CardList', serviceElementsFactory)
  }
}
