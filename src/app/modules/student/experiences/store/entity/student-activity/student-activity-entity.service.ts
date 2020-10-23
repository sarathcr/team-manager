import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { StudentActivityRP } from '../../../constants/model/activities.model'

@Injectable()
export class StudentActivityEntityService extends EntityCollectionServiceBase<
  StudentActivityRP
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('StudentActivity', serviceElementsFactory)
  }
}
