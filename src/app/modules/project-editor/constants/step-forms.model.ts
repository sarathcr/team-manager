import { Country } from 'src/app/shared/constants/country.model'
import { Region } from 'src/app/shared/constants/region.model'
import { AcademicYear } from 'src/app/shared/constants/academic-year.model'
import { Grade } from 'src/app/shared/constants/grade.model'
import { Subject } from 'src/app/shared/constants/subject.model'
import { Theme } from 'src/app/shared/constants/theme.model'
import { DrivingQuestion } from 'src/app/shared/constants/driving-questions.model'
import { Status, StepState } from './step.model'
import { CompetencyObjectives } from 'src/app/shared/constants/competency-objective.model'

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

export interface FormOneInitData {
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
export interface FormSevenInitData {
  drivingQuestions: DrivingQuestion[];
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
export interface FormTwoInitData {
  themes?: Theme[],
  placeholder?: string
}

export interface FormThree {
  data: {
    competencyObjectives: CompetencyObjectives[]
  }
  stepStatus: StepState
}
export interface FormThreeData {
  competencyObjectives: CompetencyObjectives[]
}
export interface FormThreeInitData {
  competencyObjectives?: CompetencyObjectives[],
  placeholder?: string
}

export interface FormSix {
  data: {
    creativeTitle?: string;
    creativeImage?: string;
    status?: Status
  }
  stepStatus: StepState
}

export interface FormSixInitData {
  creativeTitle?: string
  creativeImage?: string
}

export interface FormEight {
  data: {
    finalProduct?: string;
    status?: Status
  }
  stepStatus: StepState
}

export type FormEightInitData = string

export interface FormNine {
  data: {
    synopsis?: string;
    status?: Status
  }
  stepStatus: StepState
}

export type FormNineInitData = string


