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
import { TranslateService } from '@ngx-translate/core'

import { SocialAuthService } from 'angularx-social-login'
import { BsModalRef } from 'ngx-bootstrap/modal'

import { CheckBoxData } from 'src/app/common-shared/constants/model/form-elements.model'
import { GoogleAuthService } from 'src/app/common-shared/services/google/google-auth.service'
import {
  validateEmail,
  validatePassword,
} from 'src/app/common-shared/utility/form.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { environment } from 'src/environments/environment'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup
  checkboxData: CheckBoxData = { checked: false }
  enableValidator = true
  invalid = false
  loading = true
  active = false
  modalRef: BsModalRef
  buttonLoading = false
  policyTextLink = ''
  subscriptions = new SubSink()
  env = environment

  @ViewChild('activationSuccessModal') activationSuccessModal: TemplateRef<any>
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private googleAuthService: GoogleAuthService,
    private translateService: TranslateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.redirectByStatus()
    this.routeInit()
    this.getPolicyTextLink()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getPolicyTextLink(): void {
    this.subscriptions.sink = this.translateService
      .stream(['SIGNUP_PAGE.platform_checkbox_policies'])
      .subscribe((translations) => {
        this.policyTextLink = translations[
          'SIGNUP_PAGE.platform_checkbox_policies'
        ].split('|')[1]
      })
  }

  routeInit(): void {
    this.subscriptions.sink = this.route.queryParams.subscribe((query) => {
      if (query?.email) {
        this.email.setValue(atob(query.email))
      }
    })
  }

  redirectByStatus(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/editor'])
    } else if (this.authService.loggedUser?.id) {
      this.router.navigate(['/activation'])
    } else {
      this.signUpInit()
      this.loading = false
    }
  }

  signUpInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [validatePassword]],
      newsLetter: false,
      privacyPolicy: [false, [Validators.requiredTrue]],
    })
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.authService
          .googleAuth(
            {
              tocken: user.idToken,
              newsletterSubscription: this.newsLetter.value,
            },
            false
          )
          .subscribe((valid) => {
            if (valid) {
              this.invalid = false
              this.redirectByStatus()
            } else {
              this.buttonLoading = false
            }
          })
      }
    })
  }

  setValid(): void {
    if (this.invalid) {
      this.invalid = false
    }
  }

  get email(): AbstractControl {
    return this.signUpForm.get('email')
  }

  get password(): AbstractControl {
    return this.signUpForm.get('password')
  }

  get newsLetter(): AbstractControl {
    return this.signUpForm.get('newsLetter')
  }

  get privacyPolicy(): AbstractControl {
    return this.signUpForm.get('privacyPolicy')
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.buttonLoading = true
      this.authService
        .signUp({
          email: this.email.value,
          password: this.password.value,
          newsletterSubscription: this.newsLetter.value,
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

  googleSignUp(): void {
    this.googleAuthService.googleLogin()
  }
}
