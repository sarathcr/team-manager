import { Country } from 'src/app/shared/constants/country.model'
import { Region } from 'src/app/shared/constants/region.model'
import { AcademicYear } from 'src/app/shared/constants/academic-year.model'
import { Grade } from 'src/app/shared/constants/grade.model'
import { Subject } from 'src/app/shared/constants/subject.model'
import { Theme } from 'src/app/shared/constants/theme.model'
import { DrivingGuestion } from 'src/app/shared/constants/driving-questions.model'
import { Status, StepState } from './step.model'

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
    drivingQuestions: DrivingGuestion[]
  }
  stepStatus: StepState
}
export interface FormSevenInitData {
  drivingQuestions: DrivingGuestion[];
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
  themes: Theme[],
  placeholder?: string
}
export interface FormEight {
  data: {
      finalProduct?: string;
      status?: Status
  }
  stepStatus: StepState
}

export type FormEightInitData = string
