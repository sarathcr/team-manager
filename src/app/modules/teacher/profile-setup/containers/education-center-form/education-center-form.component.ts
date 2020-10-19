import { Component, OnDestroy, OnInit } from '@angular/core'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ZipcodeService } from '../../../project-editor/services/zipcode/zipcode.service'
import { ProfileSetupService } from '../../services/profile-setup/profile-setup.service'

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
    public profileService: ProfileSetupService
  ) {}

  ngOnInit(): void {
    this.formInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  formInit(): void {
    const { zipCode, profileStepdata, eduCenters } = this.profileService
    this.setEducenters()
    this.isValidated = zipCode.length === 5
    this.isValid =
      profileStepdata[1].valid || (zipCode.length === 5 && eduCenters !== null)
  }

  setEducenters(): void {
    const {
      eduCenters,
      zipCode,
      profileStepdata,
      currentStep,
      eduCenter,
    } = this.profileService
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
      (hasNotFound ||
        profileStepdata[currentStep.stepIndex].valid ||
        zipCode) &&
      eduCenters !== null
    ) {
      this.pushNotFoundToList()
    }
  }

  pushNotFoundToList(): void {
    this.eduCenters = [
      ...this.eduCenters,
      {
        checked:
          this.profileService.profileStepdata[1].valid &&
          !this.profileService.eduCenter?.id,
        title:
          'PROFILE.profile_setup_educationalestablishment_search_results_option_notfound',
      },
    ]
  }

  handleSearch($event: any): void {
    const { profileStepdata, currentStep } = this.profileService
    this.isValidated = false
    this.eduCenters = []
    this.profileService.eduCenters = []
    this.profileService.eduCenter = null
    this.profileService.zipCode = $event
    profileStepdata[currentStep.stepIndex].valid = false
    if (this.profileService.zipCode.length >= 5) {
      this.loading = true
      this.profileService.eduCenters = null
      this.zipcodeService
        .checkZipCode(this.profileService.zipCode)
        .subscribe((value) => {
          this.isValidated = true
          if (value) {
            this.isValid = true
            this.profileService
              .getEducationCenter(this.profileService.zipCode)
              .subscribe((data) => {
                this.profileService.eduCenters = data
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
    const { profileStepdata, currentStep } = this.profileService
    const currentProfile = profileStepdata[currentStep.stepIndex]
    currentProfile.valid = center.checked
    this.profileService.eduCenter = this.profileService.eduCenters?.find(
      (eduCenter) => eduCenter.id === center.id
    )
  }
}
