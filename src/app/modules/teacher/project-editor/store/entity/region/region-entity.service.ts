import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Region } from 'src/app/modules/shared/constants/model/curriculum-data.model'

@Injectable()
export class RegionEntityService extends EntityCollectionServiceBase<Region> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Region', serviceElementsFactory)
  }
}
