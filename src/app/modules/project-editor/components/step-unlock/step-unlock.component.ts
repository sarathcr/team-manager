import { Component, Input } from '@angular/core'

import { FieldConfig } from 'src/app/shared/constants/model/form-elements.model'

@Component({
  selector: 'app-step-unlock',
  templateUrl: './step-unlock.component.html',
  styleUrls: ['./step-unlock.component.scss'],
})
export class StepUnlockComponent {
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  @Input() description: string
  @Input() buttonText: string
  @Input() buttonLink: string
  @Input() title = 'PROJECT.project_dependancy_title'

  constructor() {}
}
