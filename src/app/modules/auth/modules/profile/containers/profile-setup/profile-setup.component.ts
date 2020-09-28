import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { StepStatus } from '../../constants/model/profile.model'

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'],
})
export class ProfileSetupComponent implements OnInit, OnDestroy {
  loading = true
  firstStepIndex = 0
  lastStepIndex = 0
  isFormValid = false
  buttonLoading = false
  subscriptions = new SubSink()
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.stepInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  stepInit(): void {
    this.lastStepIndex = this.userService.profileStepdata.length - 1
    this.userService.currentStep = {
      stepIndex: this.firstStepIndex,
      value: this.userService.profileStepdata[0].value,
    }
    this.userService.checkStepOneValidity()
    if (this.userService.profileStepdata[0].valid) {
      this.handleValidFormSubmit()
      if (this.userService.profileStepdata[1].valid) {
        this.handleValidFormSubmit()
        if (this.userService.profileCompleted) {
          this.userService.profileStepdata[2].status = 'DONE'
          this.userService.profileStepdata[2].assetUrl =
            './assets/images/profile/confirm.png'
        }
      }
    } else {
      this.setCurrentStep(0)
    }

    this.userService.getUser().subscribe((user) => {
      if (
        user?.profileCompleted &&
        this.userService.currentStep.stepIndex !== this.lastStepIndex
      ) {
        this.router.navigate(['/not-found'])
      }
      if (
        user &&
        (!user.profileCompleted ||
          this.userService.currentStep.stepIndex === this.lastStepIndex)
      ) {
        this.loading = false
      }
    })
  }

  handleCurrentFormSubmit(): void {
    const isLastStep =
      this.userService.currentStep.stepIndex === this.lastStepIndex
    if (isLastStep) {
      this.handleProfileSubmit()
    } else {
      this.unsetCurrentStep('DONE')
      this.setCurrentStep(this.userService.currentStep.stepIndex + 1)
    }
  }

  handleValidFormSubmit(): void {
    this.unsetCurrentStep('DONE')
    this.setCurrentStep(this.userService.currentStep.stepIndex + 1)
  }

  handleProfileSubmit(): void {
    this.buttonLoading = true
    const { userFormData, eduCenter, eduCenters, workPlace } = this.userService
    const userData = {
      ...userFormData,
      center: eduCenters.find((center) => center.id === eduCenter?.id),
      workPlace,
    }
    this.userService.updateUser(userData).subscribe((data) => {
      if (data) {
        this.userService.profileCompleted = true
        this.userService.profileStepdata[2].assetUrl =
          './assets/images/profile/confirm.png'
        this.userService.profileStepdata[2].status = 'DONE'
      }
    })
  }

  goToStep(stepIndex: number): void {
    this.unsetCurrentStep('PENDING')
    this.setCurrentStep(stepIndex)
  }

  unsetCurrentStep(status: StepStatus): void {
    const stepData = this.userService.profileStepdata[
      this.userService.currentStep.stepIndex
    ]
    stepData.currentStep = false
    stepData.status = status
  }

  setCurrentStep(stepIndex: number): void {
    const stepData = this.userService.profileStepdata[stepIndex]
    const { value } = stepData
    stepData.currentStep = true
    stepData.status = 'INPROGRESS'
    this.userService.currentStep = { stepIndex, value }
  }
}
