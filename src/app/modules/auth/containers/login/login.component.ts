import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { SocialAuthService } from 'angularx-social-login'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { GoogleAuthService } from 'src/app/common-shared/services/google/google-auth.service'
import { PreviousRouteService } from 'src/app/common-shared/services/previous-route/previous-route.service'

import { validateEmail } from 'src/app/common-shared/utility/form.utility'
import { getUserFromJWT } from 'src/app/common-shared/utility/jwt.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { environment } from 'src/environments/environment'
import { AuthService } from '../../services/auth/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  enableValidator = true
  invalid = false
  loading = true
  active = false
  modalRef: BsModalRef
  buttonLoading = false
  subscriptions = new SubSink()
  env = environment
  @ViewChild('activationSuccessModal') activationSuccessModal: TemplateRef<any>
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private googleAuthService: GoogleAuthService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.redirectByStatus()
    this.routeInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  routeInit(): void {
    this.subscriptions.sink = this.route.queryParams.subscribe((query) => {
      if (query?.email) {
        this.email.setValue(atob(query.email))
      }
    })
  }

  redirectByStatus(): void {
    const userId = this.route.firstChild?.snapshot?.paramMap.get('userId')
    const token = this.route.firstChild?.snapshot?.paramMap.get('token')
    if (userId && token) {
      this.sendActivationLink(token, userId)
    } else {
      if (this.authService.isLoggedIn()) {
        if (getUserFromJWT()?.profile === 'TEACHER') {
          this.router.navigate(['/editor'])
        } else {
          this.router.navigate(['/experiences'])
        }
        this.previousRouteService.previousUrl = '/login'
      } else if (this.authService.loggedUser?.id) {
        this.router.navigate(['/activation'])
      } else {
        this.loginInit()
        this.loading = false
      }
    }
  }

  loginInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    })
    this.subscriptions.sink = this.socialAuthService.authState.subscribe(
      (user) => {
        if (user && !this.authService.isLoggedout) {
          this.authService
            .googleAuth({ tocken: user.idToken }, this.rememberMe.value)
            .subscribe((valid) => {
              if (valid) {
                this.invalid = false
                this.redirectByStatus()
                const tokenExpiry = JSON.parse(atob(user.idToken.split('.')[1]))
                  .exp // get token expiry from google JWT token
                this.googleAuthService.setGoogleToken(user.authToken) // set google auth token
                this.googleAuthService.setGoogleTokenExpiry(tokenExpiry) // set google auth token expiry
              }
            })
        }
      }
    )
  }

  setValid(): void {
    if (this.invalid) {
      this.invalid = false
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')
  }

  get rememberMe(): AbstractControl {
    return this.loginForm.get('rememberMe')
  }

  login(): void {
    if (this.loginForm.valid) {
      this.buttonLoading = true
      this.authService
        .login({
          email: this.email.value,
          password: this.password.value,
          rememberMe: this.rememberMe.value,
        })
        .subscribe((valid) => {
          if (valid) {
            this.invalid = false
            this.redirectByStatus()
          } else {
            this.invalid = true
            this.buttonLoading = false
          }
        })
    }
  }

  googleLogin(): void {
    this.authService.isLoggedout = false
    this.googleAuthService.googleLogin()
  }

  sendActivationLink(token: string, userId: string): void {
    this.authService.sendActivationLink(userId, token).subscribe((success) => {
      if (success) {
        this.loginInit()
        this.loading = false
        this.openSuccessModal()
      } else {
        this.router.navigate(['activation-error'])
      }
    })
  }

  openSuccessModal(): void {
    this.modalRef = this.modalService.show(this.activationSuccessModal, {
      ignoreBackdropClick: true,
      class: 'modal-info modal-dialog-centered',
    })
  }

  confirmModalSuccess(): void {
    this.modalRef.hide()
    this.router.navigate(['login'])
  }

  forgotPassword(): void {
    this.router.navigate(['forgot-password'])
  }
}
