import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { StepStatus } from './constants/model/profile.model'
import { ProfileSetupService } from './services/profile-setup/profile-setup.service'

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
  constructor(
    private userService: UserService,
    public profileService: ProfileSetupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stepInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  stepInit(): void {
    this.lastStepIndex = this.profileService.profileStepdata.length - 1
    this.profileService.currentStep = {
      stepIndex: this.firstStepIndex,
      value: this.profileService.profileStepdata[0].value,
    }
    this.profileService.checkStepOneValidity()
    if (this.profileService.profileStepdata[0].valid) {
      this.handleValidFormSubmit()
      if (this.profileService.profileStepdata[1].valid) {
        this.handleValidFormSubmit()
        if (this.profileService.profileCompleted) {
          this.profileService.profileStepdata[2].status = 'DONE'
          this.profileService.profileStepdata[2].assetUrl =
            './assets/images/profile/confirm.png'
        }
      }
    } else {
      this.setCurrentStep(0)
    }

    this.userService.getUser().subscribe((user) => {
      if (
        user?.profileCompleted &&
        this.profileService.currentStep.stepIndex !== this.lastStepIndex
      ) {
        this.router.navigate(['/not-found'])
      }
      if (
        user &&
        (!user.profileCompleted ||
          this.profileService.currentStep.stepIndex === this.lastStepIndex)
      ) {
        this.loading = false
      }
    })
  }

  handleCurrentFormSubmit(): void {
    const isLastStep =
      this.profileService.currentStep.stepIndex === this.lastStepIndex
    if (isLastStep) {
      this.handleProfileSubmit()
    } else {
      this.unsetCurrentStep('DONE')
      this.setCurrentStep(this.profileService.currentStep.stepIndex + 1)
    }
  }

  handleValidFormSubmit(): void {
    this.unsetCurrentStep('DONE')
    this.setCurrentStep(this.profileService.currentStep.stepIndex + 1)
  }

  handleProfileSubmit(): void {
    this.buttonLoading = true
    const {
      userFormData,
      eduCenter,
      eduCenters,
      workPlace,
    } = this.profileService
    const userData = {
      ...userFormData,
      center: eduCenters.find((center) => center.id === eduCenter?.id),
      workPlace,
    }
    this.userService.updateUser(userData).subscribe((data) => {
      if (data) {
        this.profileService.profileCompleted = true
        this.profileService.profileStepdata[2].assetUrl =
          './assets/images/profile/confirm.png'
        this.profileService.profileStepdata[2].status = 'DONE'
      }
    })
  }

  goToStep(stepIndex: number): void {
    this.unsetCurrentStep('PENDING')
    this.setCurrentStep(stepIndex)
  }

  unsetCurrentStep(status: StepStatus): void {
    const stepData = this.profileService.profileStepdata[
      this.profileService.currentStep.stepIndex
    ]
    stepData.currentStep = false
    stepData.status = status
  }

  setCurrentStep(stepIndex: number): void {
    const stepData = this.profileService.profileStepdata[stepIndex]
    const { value } = stepData
    stepData.currentStep = true
    stepData.status = 'INPROGRESS'
    this.profileService.currentStep = { stepIndex, value }
  }

  navigateToHome(): void {
    this.router.navigate([''])
  }
}
