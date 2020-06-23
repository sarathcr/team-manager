import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { ContextualHelp } from 'src/app/shared/constants/contextual-help.model'

@Injectable()
export class HelpEntityService extends EntityCollectionServiceBase<ContextualHelp> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('ContextualHelp', serviceElementsFactory)
    }

}
