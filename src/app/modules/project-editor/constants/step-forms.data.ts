import { FormOneInitData, FormTwoInitData, FormSevenInitData, FormEightInitData, FormNineInitData, FormSixInitData, FormThreeInitData } from './step-forms.model'

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
export class formThreeInitData implements FormThreeInitData {
  competencyObjectives = []
}

export class formSixInitData implements FormSixInitData {
  creativeTitle = ''
  creativeImage = ''
}

export const formEightInitData: FormEightInitData = ''

export const formNineInitData: FormNineInitData = ''
