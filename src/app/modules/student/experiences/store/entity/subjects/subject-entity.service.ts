import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Subject } from 'src/app/modules/shared/constants/model/curriculum-data.model'

@Injectable()
export class SubjectEntityService extends EntityCollectionServiceBase<Subject> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Subject', serviceElementsFactory)
  }
}
