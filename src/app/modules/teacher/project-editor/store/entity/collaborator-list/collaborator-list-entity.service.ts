import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { CollaboratorList } from '../../../constants/model/collaborator'

@Injectable()
export class CollaboratorListEntityService extends EntityCollectionServiceBase<
  CollaboratorList
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CollaboratorList', serviceElementsFactory)
  }
}
