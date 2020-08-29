import { EntityMetadataMap } from '@ngrx/data'

import {
  compareProjects,
  ProjectList,
} from '../../constants/model/project.model'

export const entityMetadata: EntityMetadataMap = {
  Project: {
    sortComparer: compareProjects,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  ProjectList: {
    selectId: (projectList: ProjectList) => projectList.pageNumber,
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
  Grade: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  AcademicYear: {
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
}
