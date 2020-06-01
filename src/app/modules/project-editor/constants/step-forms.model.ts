import { Country } from 'src/app/shared/constants/country.model';
import { Region } from 'src/app/shared/constants/region.model';
import { AcademicYear } from 'src/app/shared/constants/academic-year.model';
import { Grade } from 'src/app/shared/constants/grade.model';
import { Subject } from 'src/app/shared/constants/subject.model';
import { Status, StepState } from './step.model';

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
        finalProduct?: string;
        status?: Status
    }
    stepStatus: StepState
}

export type FormSevenInitData = string



