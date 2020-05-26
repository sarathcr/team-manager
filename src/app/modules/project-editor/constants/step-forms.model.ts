import { Country } from 'src/app/shared/constants/country.model';
import { Region } from 'src/app/shared/constants/region.model';
import { AcademicYear } from 'src/app/shared/constants/academic-year.model';
import { Grade } from 'src/app/shared/constants/grade.model';
import { Subject } from 'src/app/shared/constants/subject.model';

export interface StepForm1 {
    data: StepForm1Data,
    inProgress: boolean,
    done: boolean,
}
export interface StepForm1Data {
    country: Country,
    region: Region,
    academicYear: AcademicYear,
    grades: Grade[],
    subjects: Subject[]
}
export interface StepForm1InitData {
    country: Country[],
    region: Region[],
    academicYear: AcademicYear[],
    grades: Grade[],
    subjects: Subject[]
}
