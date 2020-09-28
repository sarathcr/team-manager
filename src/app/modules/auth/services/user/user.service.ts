import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import {
  EduCenter,
  User,
  UserData,
  Workplace,
} from '../../constants/model/login'

import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { UserEntityService } from 'src/app/modules/auth/store/entity/user/user-entity.service'
import { StorageService } from 'src/app/shared/services/storage/storage.service'
import { environment } from 'src/environments/environment'
import { userFormInit } from '../../modules/profile/constants/model/profile.data'
import {
  CuriousStepData,
  ProfileStep,
} from '../../modules/profile/constants/model/profile.model'

import { validatePhoneNumberRegex } from 'src/app/shared/utility/form.utility'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User
  userFormData: UserData = { ...userFormInit }
  zipCode = ''
  eduCenters: EduCenter[]
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
  constructor(
    private storage: StorageService,
    private userService: UserEntityService,
    private http: HttpClient
  ) {}

  getUser(): Observable<User> {
    const userId = this.getUserId()
    return this.userService.entities$.pipe(
      map((users) => {
        const user = users.find((userData) => userData.id === +userId)
        if (!user) {
          this.userService.getByKey(userId)
        } else {
          this.user = user
        }
        return user
      })
    )
  }

  getUserId(): number {
    return this.user?.id ? this.user.id : this.storage.getUserId()
  }

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

  updateUser(dataChange: any): Observable<any> {
    const { id, email, profile } = this.user
    const mandatoryFields = {
      id,
      email,
      profile,
    }
    const payload = { ...mandatoryFields, ...dataChange }
    return this.userService.update(payload)
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
