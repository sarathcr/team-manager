import { FormOneInitData, FormTwoInitData, FormSevenInitData, FormEightInitData } from './step-forms.model'
import { DrivingQuestion } from 'src/app/shared/constants/driving-questions.model';
import { Theme } from 'src/app/shared/constants/theme.model';

export class formOneInitData implements FormOneInitData {
  country = [];
  region = [];
  academicYear = [];
  grades = [];
  subjects = [];
  finalProduct = [];
}
export class formSevenInitData implements FormSevenInitData {
  drivingQuestions: DrivingQuestion[] = [
    {
      id: null,
      name: null
    }
  ]
}
export class formTwoInitData implements FormTwoInitData {
  themes: Theme[] = [
    {
      id: null,
      name: null
    }
  ]
}
export const formEightInitData: FormEightInitData = ''
