import { FieldConfig, DropDownConfig } from 'src/app/shared/constants/model/form-config.model'
import { Status } from 'src/app/modules/project-editor/constants/model/project.model'

export class ButtonSubmitConfig implements FieldConfig {
  name = 'submit'
  field = 'button'
  id = 'submitButton'
  disabled = true
  submitted = false
  label = 'PROJECT.project_button_markdone'
  successLabel = 'PROJECT.project_button_done'
}

export class DropdownConfigInit implements DropDownConfig {
  id = ''
  name = ''
  disabled = true
  data = []
  selectedItems = []
  status: Status = 'PENDING'
  canDeselect = true
  settings = {
    textField: '',
    singleSelection: true,
    maxHeight: 250,
  }
  constructor(name: string, multiSelection?: string) {
    this.name = name
    this.id = name
    this.settings.textField = name === 'academicYear' ? 'academicYear' : 'name'
    if (multiSelection) {
      this.settings.singleSelection = false
    }
  }
}
