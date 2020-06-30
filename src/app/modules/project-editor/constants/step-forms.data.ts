import {
  FormTwoInit,
  FormSevenInit,
  FormEightInit,
  FormNineInit,
  FormSixInit,
  FormThreeInit
} from './step-forms.model'

export class FormSevenInitData implements FormSevenInit {
  drivingQuestions = []
}
export class FormTwoInitData implements FormTwoInit {
  themes = []
}
export class FormThreeInitData implements FormThreeInit {
  competencyObjectives = []
}

export class FormSixInitData implements FormSixInit {
  creativeTitle = ''
  creativeImage = ''
}

export const FormEightInitData: FormEightInit = ''

export const FormNineInitData: FormNineInit = ''

export class FormOneFieldsStatus {
  country = 'PENDING'
  region = 'PENDING'
  academicYear = 'PENDING'
  grades = 'PENDING'
  subjects = 'PENDING'
}
