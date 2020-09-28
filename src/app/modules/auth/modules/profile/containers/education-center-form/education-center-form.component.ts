import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { ZipcodeService } from 'src/app/modules/project-editor/services/zipcode/zipcode.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-education-center-form',
  templateUrl: './education-center-form.component.html',
  styleUrls: ['./education-center-form.component.scss'],
})
export class EducationCenterFormComponent implements OnInit, OnDestroy {
  label = 'Centros educativos'
  searchtext = ''
  subscriptions = new SubSink()
  isValidated = false
  isValid = false
  showEduCenterError = false
  placeHolder = ''
  notFoundError = ''
  loading = false
  eduCenters = []

  constructor(
    private zipcodeService: ZipcodeService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.formInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  formInit(): void {
    const { zipCode, profileStepdata } = this.userService
    this.setEducenters()
    this.isValidated = zipCode.length === 5
    this.isValid = profileStepdata[1].valid
  }

  setEducenters(): void {
    const {
      eduCenters,
      zipCode,
      profileStepdata,
      currentStep,
      eduCenter,
    } = this.userService
    if (eduCenters?.length) {
      this.eduCenters = eduCenters
        .filter((_, index) => index < 4)
        .map((eduCenterData) => {
          return {
            checked: eduCenterData.id === eduCenter?.id,
            title: eduCenterData.name,
            description: eduCenterData.address,
            id: eduCenterData?.id,
          }
        })
    }
    const hasNotFound =
      this.eduCenters.length &&
      !this.eduCenters.find((center) => center.title !== this.notFoundError)
    if (
      hasNotFound ||
      profileStepdata[currentStep.stepIndex].valid ||
      zipCode
    ) {
      this.pushNotFoundToList()
    }
  }

  pushNotFoundToList(): void {
    this.eduCenters = [
      ...this.eduCenters,
      {
        checked:
          this.userService.profileStepdata[1].valid &&
          !this.userService.eduCenter?.id,
        title:
          'PROFILE.profile_setup_educationalestablishment_search_results_option_notfound',
      },
    ]
  }

  handleSearch($event: any): void {
    const { profileStepdata, currentStep } = this.userService
    this.isValidated = false
    this.eduCenters = []
    this.userService.eduCenters = []
    this.userService.eduCenter = null
    this.userService.zipCode = $event
    profileStepdata[currentStep.stepIndex].valid = false
    if (this.userService.zipCode.length >= 5) {
      this.loading = true
      this.zipcodeService
        .checkZipCode(this.userService.zipCode)
        .subscribe((value) => {
          this.isValidated = true
          if (value) {
            this.isValid = true
            this.userService
              .getEducationCenter(this.userService.zipCode)
              .subscribe((data) => {
                this.userService.eduCenters = data
                if (data?.length) {
                  this.showEduCenterError = false
                } else {
                  this.showEduCenterError = true
                }
                this.setEducenters()
                this.loading = false
              })
          } else {
            this.isValid = false
            this.loading = false
          }
        })
    }
  }

  selectCenter(center: any): void {
    const { profileStepdata, currentStep } = this.userService
    const currentProfile = profileStepdata[currentStep.stepIndex]
    currentProfile.valid = center.checked
    this.userService.eduCenter = this.userService.eduCenters.find(
      (eduCenter) => eduCenter.id === center.id
    )
  }
}
