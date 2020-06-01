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
  finalProduct?: Object;
  country?: Country;
  region?: Region;
  academicYear?: AcademicYear;
  commonThreads?: Array<object>;
  themes?: Array<object>;
  guideQuestions?: Array<object>;
  grades?: Array<Grade>;
  subjects?: Array<Subject>;
  createdAt?: string;
  updatedAt?: string;
}

export function compareProjects(p1: Project, p2: Project) {
  const firstTimestamp = new Date(p1?.createdAt).getTime()
  const secondTimestamp = new Date(p2?.createdAt).getTime()
    const compare = firstTimestamp - secondTimestamp;
    if (compare > 0) {
      return -1;
    }
    else if (compare < 0) {
      return 1;
    }
    else return 0;
  }