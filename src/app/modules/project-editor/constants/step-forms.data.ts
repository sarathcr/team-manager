import { FormOneInitData, FormSevenData,  FormEightInitData } from './step-forms.model'

export class formOneInitData implements FormOneInitData {
    country = [];
    region = [];
    academicYear = [];
    grades = [];
    subjects = [];
    finalProduct = [];
}
export class formSevenInitData implements FormSevenData {
  drivingQuestions = []
}
export const formEightInitData: FormEightInitData  = ''
