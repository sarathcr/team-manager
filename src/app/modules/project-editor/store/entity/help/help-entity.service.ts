import { Injectable } from '@angular/core'

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'

import { ContextualHelp } from '../../../constants/model/project.model'

@Injectable()
export class HelpEntityService extends EntityCollectionServiceBase<ContextualHelp> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('ContextualHelp', serviceElementsFactory)
    }

}
