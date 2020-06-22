import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { AcademicYear } from 'src/app/modules/project-editor/constants/project.model'

@Injectable()
export class AcademicYearEntityService extends EntityCollectionServiceBase<AcademicYear> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('AcademicYear', serviceElementsFactory)
    }
}
