import { Project } from './project.model';

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
  