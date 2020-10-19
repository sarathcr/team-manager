import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { StorageService } from 'src/app/common-shared/services/storage/storage.service'
import { AuthService } from '../services/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate(): boolean {
    // Force logout if JWT token is not containing profile/role
    // This immediate if condition should be removed on or after Nov 1st
    if (
      this.authService.isLoggedIn() &&
      this.storage.getUserProfile() !== 'TEACHER' &&
      this.storage.getUserProfile() !== 'STUDENT'
    ) {
      this.authService.logout()
      this.router.navigate(['/login'])
      return false
    }
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'])
      return false
    } else if (
      this.authService.loggedUser?.id &&
      !this.authService.loggedUser?.activa
    ) {
      this.router.navigate(['/activation'])
      return false
    }
    return true
  }
}
