import { EntityMetadataMap } from '@ngrx/data'

import { ContextualHelp } from '../../constants/model/help.model'

export const entityMetadata: EntityMetadataMap = {
  ContextualHelp: {
    selectId: (help: ContextualHelp) => help.stepid,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
}
