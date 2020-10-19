import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, Input } from '@angular/core'
import { CuriousStepData } from '../../constants/model/profile.model'

@Component({
  selector: 'app-curious-sidebar',
  templateUrl: './curious-sidebar.component.html',
  styleUrls: ['./curious-sidebar.component.scss'],
})
export class CuriousSidebarComponent {
  constructor() {}
  @Input() title: string
  @Input() stepData: CuriousStepData[]

  onNodeClick(step: CuriousStepData): void {
    step.status = 'INPROGRESS'
    step.currentStep = true
  }
}
