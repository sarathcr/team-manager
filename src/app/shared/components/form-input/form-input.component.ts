import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
// Interfaces
import { FieldConfig} from '../../constants/model/form-config.model'

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  config: FieldConfig
  group: FormGroup
}
