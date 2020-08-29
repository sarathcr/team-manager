import { Component, Input } from '@angular/core'

import { Status } from '../../constants/model/project.model'

@Component({
  selector: 'app-step-status',
  templateUrl: './step-status.component.html',
  styleUrls: ['./step-status.component.scss'],
})
export class StepStatusComponent {
  @Input() status: Status

  constructor() {}
}
