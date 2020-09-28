import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { UserService } from '../services/user/user.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    const subscriptions = new SubSink()
    subscriptions.sink = this.userService.getUser().subscribe((data) => {
      subscriptions.unsubscribe()
      if (data && data.profileCompleted) {
        this.router.navigate(['/'])
        return false
      }
    })
    return true
  }
}
