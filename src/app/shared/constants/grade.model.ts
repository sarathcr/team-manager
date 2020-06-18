import { AcademicYear } from './academic-year.model';
import { Region } from './region.model';
import { Subject } from './subject.model';

export class Grade {
  id: number;
  name: string;
  academicYear?: AcademicYear;
  region?: Region;
  subjectList?: Subject[];
}
