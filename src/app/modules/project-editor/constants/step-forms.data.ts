import { FormOneInitData, FormOne, FormTwoInitData } from './step-forms.model'

export class formOneInitData implements FormOneInitData {
    country = [];
    region = [];
    academicYear = [];
    grades = [];
    subjects = [];
}

export class formTwoInitData implements FormTwoInitData {
  themes = []
}
