import { FormOneInitData, FormTwoInitData, FormSevenInitData, FormEightInitData, FormNineInitData, FormSixInitData } from './step-forms.model'
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
  drivingQuestions = []
}
export class formTwoInitData implements FormTwoInitData {
  themes= []
}

export const formSixInitData: FormSixInitData = ''

export const formEightInitData: FormEightInitData = ''

export const formNineInitData: FormNineInitData = ''
