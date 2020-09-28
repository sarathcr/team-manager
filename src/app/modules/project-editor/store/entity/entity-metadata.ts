import { EntityMetadataMap } from '@ngrx/data'

import {
  CurriculumAcademicYear,
  ProjectList,
} from '../../constants/model/project.model'

export const entityMetadata: EntityMetadataMap = {
  Project: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  ProjectList: {
    selectId: (projectList: ProjectList) => projectList.pageId,
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
}
