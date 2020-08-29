import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
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
