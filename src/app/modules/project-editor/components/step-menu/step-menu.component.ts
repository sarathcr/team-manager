import { Component, Input } from '@angular/core'

import { Step } from '../../constants/model/project.model'

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss']
})
export class StepMenuComponent {

  @Input() step: Step

  constructor() { }

}
