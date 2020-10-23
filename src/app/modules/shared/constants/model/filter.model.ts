import { AcademicYear, Subject } from './curriculum-data.model'

export interface FilterAcademicYear extends AcademicYear {
  checked: boolean
}

export interface FilterSubject extends Subject {
  checked: boolean
}

export interface FilterOptionsValues {
  id: number | string
  value: string
  checked: boolean
}

export interface FilterOptions {
  stage: FilterOptionsValues[]
  subjects: FilterOptionsValues[]
  academicYears: FilterOptionsValues[]
  type: FilterOptionsValues[]
  state: FilterOptionsValues[]
}
