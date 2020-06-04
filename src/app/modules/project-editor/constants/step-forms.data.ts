import { FormOneInitData, FormTwoInitData, FormSevenInitData, FormEightInitData } from './step-forms.model'

export class formOneInitData implements FormOneInitData {
    country = [];
    region = [];
    academicYear = [];
    grades = [];
    subjects = [];
    finalProduct = [];
}
export class formSevenInitData implements FormSevenInitData {
  drivingQuestions = []
}
export class formTwoInitData implements FormTwoInitData {
  themes = []
}
export const formEightInitData: FormEightInitData  = ''
