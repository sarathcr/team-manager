import { EntityMetadataMap } from '@ngrx/data'

import { compareProjects, ContextualHelp, ProjectList } from '../../constants/model/project.model'

export const entityMetadata: EntityMetadataMap = {
  Project: {
    sortComparer: compareProjects,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  ProjectList: {
    selectId: (projectList: ProjectList) => projectList.pageNumber,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Country: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Subject: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Region: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Grade: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  AcademicYear: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  StepStatus: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  ContextualHelp: {
    selectId: (help: ContextualHelp) => help.stepid,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Block: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  EvaluationCriteria: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  CurriculumBasicSkills: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Standard: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }

}
