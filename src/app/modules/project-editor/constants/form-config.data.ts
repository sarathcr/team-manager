import { FieldConfig } from 'src/app/shared/constants/field.model';

export class buttonSubmitConfig implements FieldConfig {
    name = 'submit'
    field = 'button'
    id = 'submitButton'
    disabled = true
    submitted = false
    label = ''
    successLabel = ''
}

