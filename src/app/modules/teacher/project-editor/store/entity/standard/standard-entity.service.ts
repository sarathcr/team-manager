import { Injectable } from '@angular/core'

import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Standard } from 'src/app/modules/shared/constants/model/curriculum-data.model'

@Injectable()
export class StandardEntityService extends EntityCollectionServiceBase<
  Standard
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Standard', serviceElementsFactory)
  }
}
