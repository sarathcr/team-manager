import { Country } from './country.model';
import { Region } from './region.model';
import { AcademicYear } from './academic-year.model';
import { Grade } from './grade.model';
import { Subject } from './subject.model';

export class Project {
  id: number | null;
  title: string;
  creativeTitle?: string;
  name?: string;
  finalProduct?: string;
  country?: Country;
  region?: Region;
  academicYear?: AcademicYear;
  commonThreads?: Array<object>;
  themes?: Array<object>;
  guideQuestions?: Array<object>;
  grades?: Array<Grade>;
  subjects?: Array<Subject>;
}

export function compareProjects(p1: Project, p2: Project) {
  const compare = p1.id - p2.id;
  if (compare > 0) {
    return -1;
  }
  else if (compare < 0) {
    return 1;
  }
  else return 0;
}