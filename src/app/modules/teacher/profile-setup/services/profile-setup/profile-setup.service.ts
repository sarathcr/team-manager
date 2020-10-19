import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import {
  EduCenter,
  User,
  UserData,
  Workplace,
} from 'src/app/modules/auth/constants/model/login.model'

import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import {
  CuriousStepData,
  ProfileStep,
} from '../../constants/model/profile.model'

import { validatePhoneNumberRegex } from 'src/app/common-shared/utility/form.utility'
import { userFormInit } from '../../constants/model/profile.data'

@Injectable({
  providedIn: 'root',
})
export class ProfileSetupService {
  user: User
  userFormData: UserData = { ...userFormInit }
  zipCode = ''
  eduCenters: EduCenter[] = null
  eduCenter: EduCenter
  workPlace: Workplace = { descriptionSection: '' }
  profileCompleted = false
  profileStepdata: CuriousStepData[] = [
    {
      name: 'PROFILE.profile_setup_aboutyou',
      status: 'PENDING',
      currentStep: false,
      assetUrl: './assets/images/profile/step1.png',
      value: 'USER_DETAILS',
      valid: false,
    },
    {
      name: 'PROFILE.profile_setup_educationalestablishment',
      status: 'PENDING',
      currentStep: false,
      assetUrl: './assets/images/profile/step2.png',
      value: 'EDUCATIONAL_CENTER',
      valid: false,
    },
    {
      name: 'PROFILE.profile_setup_workplace',
      status: 'PENDING',
      currentStep: false,
      assetUrl: './assets/images/profile/step3.png',
      value: 'WORKPLACE',
      valid: false,
    },
  ]
  currentStep: ProfileStep
  constructor(private http: HttpClient) {}

  getEducationCenter(code: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl.userService}/educenter/zipcode/${code}`)
      .pipe(
        map((value) => value),
        catchError(() => {
          return of(false)
        })
      )
  }

  checkStepOneValidity(): void {
    const {
      name,
      surName,
      phonenumber,
      country,
      region,
      role,
    } = this.userFormData
    if (
      name &&
      surName &&
      validatePhoneNumberRegex(phonenumber) &&
      country.id &&
      region.id &&
      role
    ) {
      this.profileStepdata[0].valid = true
    } else {
      this.profileStepdata[0].valid = false
    }
  }
}
