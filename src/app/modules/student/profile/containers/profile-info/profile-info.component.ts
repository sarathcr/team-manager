import { Component, OnDestroy, OnInit } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { SubSink } from 'src/app/common-shared/utility/subsink.utility'

import { User } from 'src/app/modules/auth/constants/model/login.model'
import { UserService } from 'src/app/modules/auth/services/user/user.service'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  user: User
  imageUrl = ''
  email = ''
  hasData = false
  tabsData: string[] = [
    'PROFILE.profile_data_personal',
    'PROFILE.profile_data_center',
  ]
  activeTab = 0
  subscriptions = new SubSink()
  creativeImage = ''
  title = ''
  translations: string[]
  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.subscriptions.sink = this.translate
      .stream(['PROFILE.profile_teacher_of', 'PROFILE.profile_teacher_of'])
      .subscribe((translations) => {
        this.translations = translations
      })
  }

  ngOnInit(): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      this.user = user
      this.imageUrl = user?.profileCompleted ? user?.imageUrl : ''
      this.email = user?.email
      this.hasData = user?.profileCompleted
      if (user?.profileCompleted) {
        this.title =
          user?.profile === 'TEACHER'
            ? this.translations['PROFILE.profile_teacher_of'] +
              user.workPlace.descriptionSection
            : user?.profile === 'STUDENT'
            ? this.translations['PROFILE.profile_teacher_of'] +
              user.workPlace.descriptionSection
            : ''
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getActiveTab($event: any): void {
    this.activeTab = $event
  }

  updateAvatar(url: string): void {
    this.userService.updateUser({ imageUrl: url })
  }
}
