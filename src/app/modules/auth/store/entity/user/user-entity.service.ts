import { Injectable } from '@angular/core'

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { User } from '../../../constants/model/login'

@Injectable()
export class UserEntityService extends EntityCollectionServiceBase<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory)
  }
}
