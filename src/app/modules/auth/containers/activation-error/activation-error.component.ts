import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-activation-error',
  templateUrl: './activation-error.component.html',
  styleUrls: ['./activation-error.component.scss'],
})
export class ActivationErrorComponent implements OnInit {
  linkExpired = false
  activationPage = true
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.linkExpired = this.authService.linkExpired
    if (!this.authService.userId) {
      this.router.navigate(['login'])
    }
    if (this.router.url.includes('recovery-password-error')) {
      this.activationPage = false
      this.linkExpired = true
    }
  }
}
