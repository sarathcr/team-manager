export class Project {
    id: number|null;
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

export function compareProjects(p1:Project, p2: Project) {

    const compare = p1.id - p2.id;
  
    if (compare > 0) {
      return 1;
    }
    else if ( compare < 0) {
      return -1;
    }
    else return 0;
  
  }
// -- Sample data
// "name": "Proyecto description 1",
// "title": "Proyecto title 1",
// "creativeTitle": "Proye1 creativeTitle 1",
// "commonThreads": [{"name": "commonThreads 1"},{"name": "commonThreads 2"}],
// "themes": [{"name": "themes1"}],
// "guideQuestions": [{"name": "GQ"}],
// "finalProduct": {"id":"1","name": "Maqueta"},
// "country": {"id":"1","name": "VEN"},
// "region": {"id":"1","name": "R1"},
// "academicYear": {"id":"1","academicYear": "2020"},
// "grades": [{"id":"1","name": "G1"}],
// "subjects": [{"id":"1","name": "S1"}]
