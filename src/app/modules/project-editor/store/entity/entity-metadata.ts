import { EntityMetadataMap } from '@ngrx/data'
import { compareProjects } from '../../constants/project.model'
import { ContextualHelp } from 'src/app/shared/constants/contextual-help.model'

export const entityMetadata: EntityMetadataMap = {
  Project: {
    sortComparer: compareProjects,
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
  }
}
