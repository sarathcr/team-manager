import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { User } from 'src/app/modules/auth/constants/model/login'
import { SubSink } from '../../../../../../shared/utility/subsink.utility'
import { UserService } from '../../../../services/user/user.service'

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
        console.log('translations', translations)
        this.translations = translations
      })
  }

  ngOnInit(): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      this.user = user
      this.imageUrl = user?.imageUrl
      this.email = user?.email
      this.hasData = user?.profileCompleted
      if (user?.workPlace.name) {
        this.title =
          user?.profile === 'TEACHER'
            ? this.translations['PROFILE.profile_teacher_of'] +
              user.workPlace.name
            : user?.profile === 'STUDENT'
            ? this.translations['PROFILE.profile_teacher_of'] +
              user.workPlace.name
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
