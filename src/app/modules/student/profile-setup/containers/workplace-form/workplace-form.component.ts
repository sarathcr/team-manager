import { Component, OnInit } from '@angular/core'
import { ProfileSetupService } from '../../services/profile-setup/profile-setup.service'

@Component({
  selector: 'app-workplace-form',
  templateUrl: './workplace-form.component.html',
  styleUrls: ['./workplace-form.component.scss'],
})
export class WorkplaceFormComponent implements OnInit {
  constructor(public profileService: ProfileSetupService) {}

  ngOnInit(): void {}

  handleInput(value: string): void {
    const { currentStep } = this.profileService
    this.profileService.workPlace = { descriptionSection: value }
    this.profileService.profileStepdata[currentStep.stepIndex].valid = !!value
  }
}
