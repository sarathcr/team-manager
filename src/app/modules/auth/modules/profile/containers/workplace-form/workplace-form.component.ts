import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/modules/auth/services/user/user.service'

@Component({
  selector: 'app-workplace-form',
  templateUrl: './workplace-form.component.html',
  styleUrls: ['./workplace-form.component.scss'],
})
export class WorkplaceFormComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  handleInput(value: string): void {
    const { currentStep } = this.userService
    this.userService.workPlace = { descriptionSection: value }
    this.userService.profileStepdata[currentStep.stepIndex].valid = !!value
  }
}
