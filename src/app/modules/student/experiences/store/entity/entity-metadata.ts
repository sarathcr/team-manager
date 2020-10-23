import { EntityMetadataMap } from '@ngrx/data'
import { CardList } from 'src/app/modules/shared/constants/model/card-experience.model'
import { StudentActivityRP } from '../../constants/model/activities.model'

export const entityMetadata: EntityMetadataMap = {
  CardList: {
    selectId: (cardList: CardList) => cardList.pageId,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Subject: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  StudentActivity: {
    selectId: (studentActivityList: StudentActivityRP) =>
      studentActivityList.projectId,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
}
