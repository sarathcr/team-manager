import { Status } from 'src/app/modules/project-editor/constants/model/project.model'
import {
  DropDownConfig,
  FieldConfig,
} from 'src/app/shared/constants/model/form-elements.model'

export class StepButtonSubmitConfig implements FieldConfig {
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
  loading = false
  settings = {
    textField: '',
    singleSelection: true,
    maxHeight: 250,
    noDataAvailablePlaceholderText: 'PROJECT.Error_nodata_dropdown | translate',
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
