import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { StudentGroup } from '../../../modules/activity/constants/model/form-elements.model'

@Injectable()
export class StudentGroupsEntityService extends EntityCollectionServiceBase<
  StudentGroup
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('StudentGroups', serviceElementsFactory)
  }
}
