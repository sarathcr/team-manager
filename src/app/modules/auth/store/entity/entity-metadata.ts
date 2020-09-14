import { EntityMetadataMap } from '@ngrx/data'

export const entityMetadata: EntityMetadataMap = {
  User: {
    entityDispatcherOptions: {
      optimisticUpdate: false,
    },
  },
}
