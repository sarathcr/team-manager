import { FieldConfig } from 'src/app/shared/constants/field.model';

export class buttonSubmitConfig implements FieldConfig {
    name = 'submit'
    field = 'button'
    id = 'submitButton'
    disabled = true
    submitted = false
    label = 'PROJECT.project_button_markdone'
    successLabel = 'PROJECT.project_button_done'
}
