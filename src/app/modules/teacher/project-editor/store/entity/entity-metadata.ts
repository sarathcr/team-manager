import { EntityMetadataMap } from '@ngrx/data'
import { CardList } from 'src/app/modules/shared/constants/model/card-experience.model'
import { CurriculumAcademicYear } from 'src/app/modules/shared/constants/model/curriculum-data.model'
import { BlockWithQuery } from '../../constants/model/curriculum.model'

export const entityMetadata: EntityMetadataMap = {
  Project: {},
  CardList: {
    selectId: (cardList: CardList) => cardList.pageId,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Country: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Subject: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Region: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  AcademicYear: {
    selectId: (academicYears: CurriculumAcademicYear) =>
      academicYears.curriculumId,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  StepStatus: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Block: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  BlockContent: {
    selectId: (blockWithQuery: BlockWithQuery) => blockWithQuery.id,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  EvaluationCriteria: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  CurriculumBasicSkills: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Standard: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Stage: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Activity: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Curriculum: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  CurriculumGrades: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  TeachingStrategy: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  StudentGroups: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  DriveFile: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  ActivityPreview: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  CollaboratorList: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
}
