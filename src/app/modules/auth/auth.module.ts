import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import * as fromAuth from './reducers'

import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login'

import { ActivationErrorComponent } from './containers/activation-error/activation-error.component'
import { ActivationComponent } from './containers/activation/activation.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { LoginComponent } from './containers/login/login.component'
import { RegisterComponent } from './containers/register/register.component'
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component'

import { SharedModule } from 'src/app/shared/shared.module'
import { environment } from '../../../environments/environment'

import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { AuthGuard } from './guards/auth.guard'

@NgModule({
  declarations: [
    LoginComponent,
    ActivationErrorComponent,
    ActivationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SocialLoginModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthGuard,
        AuthService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(environment.googleId),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    }
  }
}
