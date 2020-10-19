import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Role } from '../../../constants/model/login.model'

@Injectable()
export class RoleEntityService extends EntityCollectionServiceBase<Role> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Role', serviceElementsFactory)
  }
}
