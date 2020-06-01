import { Country } from 'src/app/shared/constants/country.model';
import { Region } from 'src/app/shared/constants/region.model';
import { AcademicYear } from 'src/app/shared/constants/academic-year.model';
import { Grade } from 'src/app/shared/constants/grade.model';
import { Subject } from 'src/app/shared/constants/subject.model';
import { Theme } from 'src/app/shared/constants/theme.model';

export interface FormOne extends FormStatus {
    data: {
        country: Country,
        region: Region,
        academicYear: AcademicYear,
        grades: Grade[],
        subjects: Subject[]
    }
}

export interface FormStatus {
    status: 'inprogress' | 'done' | 'pending'
}
export interface FormOneData {
    country: Country,
    region: Region,
    academicYear: AcademicYear,
    grades: Grade[],
    subjects: Subject[]
}
export interface FormOneInitData {
    country: Country[],
    region: Region[],
    academicYear: AcademicYear[],
    grades: Grade[],
    subjects: Subject[]
}

export interface FormTwo extends FormStatus {
  data: {
    themes: Theme[]
  }
}
export interface FormTwoData {
  themes: Theme[]
}
export interface FormTwoInitData {
  themes: Theme[],
  placeholder?: string
}
