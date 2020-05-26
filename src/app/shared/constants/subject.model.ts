import { Region } from './region.model';
import { AcademicYear } from './academic-year.model';

export class Subject {
  id: number;
  name: string;
  academicYear: AcademicYear;
  region: Region;
}
