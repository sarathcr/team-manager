import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CheckBoxData } from 'src/app/shared/constants/model/form-elements.model'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  password = ''
  email = ''
  checkboxData: CheckBoxData = { checked: false }
  loginDisabled = true
  enableValidator = true
  invalid = false
  loading = true
  active = false
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.redirectByStatus()
    this.loading = false
  }

  redirectByStatus(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/editor'])
    }
    else if (this.authService.loggedUser?.id) {
      this.router.navigate(['/activation'])
    }
    else {
      this.authService.doLogoutUser()
    }
  }

  validateLogin(value: string, field: string): void {
    this[field] = value
    this.loginDisabled = !(this.email && this.password)
    this.invalid = false
  }

  login(): void {
    this.loginDisabled = true
    this.authService
      .login({
        email: this.email,
        password: this.password,
        rememberMe: this.checkboxData.checked,
      })
      .subscribe(() => {
        this.loginDisabled = false
        this.redirectByStatus()
      })
  }

  googleLogin(): void {
    this.authService.googleLogin()
  }
}
