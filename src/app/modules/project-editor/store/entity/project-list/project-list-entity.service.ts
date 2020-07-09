import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { ProjectList } from '../../../constants/model/project.model'
@Injectable()
export class ProjectListEntityService extends EntityCollectionServiceBase<ProjectList> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('ProjectList', serviceElementsFactory)
    }

}
