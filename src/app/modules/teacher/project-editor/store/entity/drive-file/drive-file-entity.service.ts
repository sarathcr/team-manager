import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { DriveFileStoreData } from 'src/app/common-shared/constants/model/google-drive.model'

@Injectable()
export class DriveFileEntityService extends EntityCollectionServiceBase<
  DriveFileStoreData
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('DriveFile', serviceElementsFactory)
  }
}
