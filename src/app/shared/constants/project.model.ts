export class Project {
  id: number | null;
  title: string;
  creativeTitle: string;
  name: string;
  finalProduct: Object;
  country: Object;
  region: Object;
  academicYear: Object;
  commonThreads: Array<object>;
  themes: Array<object>;
  guideQuestions: Array<object>;
  grades: Array<object>;
  subjects: Array<object>;
}

export function compareProjects(p1: Project, p2: Project) {
  const compare = p1.id - p2.id;
  if (compare > 0) {
    return 1;
  }
  else if (compare < 0) {
    return -1;
  }
  else return 0;
}