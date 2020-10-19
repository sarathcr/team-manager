import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { User } from 'src/app/modules/auth/constants/model/login.model'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { SubSink } from '../../../../../common-shared/utility/subsink.utility'

@Component({
  selector: 'app-profile-preferences',
  templateUrl: './profile-preferences.component.html',
  styleUrls: ['./profile-preferences.component.scss'],
})
export class ProfilePreferencesComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink()
  userLanguage = 'PROFILE.es_ES'
  title = ''
  user: User
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
      if (user?.profileCompleted) {
        if (user.defaultLanguage) {
          this.userLanguage = 'PROFILE.' + user?.defaultLanguage
        }
        this.title =
          user?.profile === 'TEACHER'
            ? this.translations['PROFILE.profile_teacher_of'] +
              user.workPlace.descriptionSection
            : user?.profile === 'STUDENT'
            ? this.translations['PROFILE.profile_teacher_of'] +
              user?.workPlace.descriptionSection
            : ''
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
