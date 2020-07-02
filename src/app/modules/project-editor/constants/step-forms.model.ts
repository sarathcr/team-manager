import { Status, StepState } from './step.model'
import {
  DrivingQuestion,
  Theme,
  Subject,
  Grade,
  AcademicYear,
  Region,
  Country,
  CompetencyObjectives
} from 'src/app/modules/project-editor/constants/project.model'
import { Option } from 'src/app/shared/constants/field.model'

export interface FormOne {
  data: {
    country: Country,
    region: Region,
    academicYear: AcademicYear,
    grades: Grade[],
    subjects: Subject[]
    status?: Status
  }
  stepStatus: StepState
}

export interface FormOneInit {
  country: Country[],
  region: Region[],
  academicYear: AcademicYear[],
  grades: Grade[],
  subjects: Subject[]
}
export interface FormSeven {
  data: {
    drivingQuestions: DrivingQuestion[]
  }
  stepStatus: StepState
}
export interface FormSevenInit {
  drivingQuestions: DrivingQuestion[]
}
export interface FormTwo {
  data: {
    themes: Theme[]
  }
  stepStatus: StepState
}
export interface FormTwoData {
  themes: Theme[]
}
export interface FormTwoInit {
  themes?: Theme[],
  placeholder?: string
}

export interface FormThree {
  data: {
    competencyObjectives?: CompetencyObjectives[]
    subjects?: Subject[]
  }
  stepStatus: StepState
}

export interface FormFour {
  data: {
    subjects?: Subject[]
    basicSkills?: Option[]
  }
  stepStatus: StepState
}
export interface FormThreeData {
  competencyObjectives: CompetencyObjectives[]
}
export interface FormThreeInit {
  competencyObjectives?: CompetencyObjectives[],
  placeholder?: string
}

export interface FormSix {
  data: {
    creativeTitle?: string
    creativeImage?: string
    status?: Status
  }
  stepStatus: StepState
}

export interface FormSixInit {
  creativeTitle?: string
  creativeImage?: string
}

export interface FormEight {
  data: {
    finalProduct?: string
    status?: Status
  }
  stepStatus: StepState
}

export type FormEightInit = string

export interface FormNine {
  data: {
    synopsis?: string
    status?: Status
  }
  stepStatus: StepState
}

export type FormNineInit = string
export type FormsData = FormOne | FormTwo | FormThree | FormSix | FormSeven | FormEight | FormNine


