import { StepForm1InitData, StepForm1 } from './step-forms.model'

export class stepForm1InitData implements StepForm1InitData {
    country = [];
    region = [];
    academicYear = [];
    grades = [];
    subjects = [];
}
export class stepForm1 implements StepForm1 {
    data = {
        country: { id: null, name: null },
        region: { id: null, name: null },
        academicYear: { id: null, name: null },
        grades: [],
        subjects: []
    }
    done = false
    inProgress = false
}