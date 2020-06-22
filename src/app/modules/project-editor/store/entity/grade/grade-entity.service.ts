import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { Grade } from 'src/app/modules/project-editor/constants/project.model'

@Injectable()
export class GradeEntityService extends EntityCollectionServiceBase<Grade> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Grade', serviceElementsFactory)
    }
}
