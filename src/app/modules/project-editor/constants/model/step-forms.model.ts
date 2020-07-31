import {
  DrivingQuestion,
  Theme,
  Subject,
  Grade,
  AcademicYear,
  Region,
  Country,
  CompetencyObjective,
  Status,
  StepState,
  Project,
  Content,
} from 'src/app/modules/project-editor/constants/model/project.model'
import { Option } from 'src/app/shared/constants/model/form-elements.model'

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
  data: FormThreeData
  stepStatus: StepState
}

export interface FormFour {
  data: FormfourData
  stepStatus: StepState
}
export interface FormfourData extends Project {
  updateType?: string
  contentId?: number
  subjectId?: number
}
export interface FormThreeData extends Project {
  updateType?: string
  criteriaId?: number
  subjectId?: number
}
export interface FormThreeInit {
  competencyObjectives?: CompetencyObjective[],
  placeholder?: string
}

export interface FormFiveInit {
  competencyObjectives?: CompetencyObjective[],
  placeholder?: string
}

export interface FormFourInit {
  contents: Content[]
  basicSkills?: Option[]
}

export interface FormFive {
  data: FormFiveData
  stepStatus: StepState
}

export interface FormFiveData extends Project {
  updateType?: string
  contentId?: number
  subjectId?: number
  competencyObjectiveId?: number
  standardId?: number
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

export interface DefineUnlockStep {
  step?: 'stepThree' | 'stepFour'
}

export type FormNineInit = string
export type FormsData = FormOne | FormTwo | FormThree | FormSix | FormSeven | FormEight | FormNine | FormFive


