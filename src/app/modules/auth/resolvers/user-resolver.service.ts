import { Injectable } from '@angular/core'
import { Resolve, Router } from '@angular/router'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { UserService } from '../services/user/user.service'

@Injectable()
export class UserResolver implements Resolve<any> {
  subscriptions = new SubSink()
  constructor(private userService: UserService, private router: Router) {}

  resolve(): Promise<boolean> {
    const user = this.userService.user
    if (user) {
      const profileCompleted = user.profileCompleted
      return new Promise((resolve) => {
        resolve(this.checkUserProfileCompleted(profileCompleted))
      })
    }
    this.userService.checkUserProfile().then((profileCompleted) => {
      return this.checkUserProfileCompleted(profileCompleted)
    })
  }

  private checkUserProfileCompleted(profileCompleted: boolean): boolean {
    if (!profileCompleted) {
      this.router.navigate(['/'])
    }
    return profileCompleted
  }
}
