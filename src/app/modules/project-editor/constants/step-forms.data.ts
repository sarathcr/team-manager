import { FormOneInitData, FormTwoInitData, FormEightInitData } from './step-forms.model'

export class formOneInitData implements FormOneInitData {
    country = [];
    region = [];
    academicYear = [];
    grades = [];
    subjects = [];
    finalProduct = [];
}
export class formTwoInitData implements FormTwoInitData {
  themes = []
}
export const formEightInitData: FormEightInitData  = ''
