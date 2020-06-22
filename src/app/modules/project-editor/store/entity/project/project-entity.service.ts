import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
@Injectable()
export class ProjectEntityService extends EntityCollectionServiceBase<any> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Project', serviceElementsFactory);
    }

}