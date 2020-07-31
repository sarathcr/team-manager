import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import * as fromAuth from './reducers'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login'
import { GoogleLoginProvider } from 'angularx-social-login'

import { LoginComponent } from './containers/login/login.component'
import { ActivationErrorComponent } from './containers/activation-error/activation-error.component'
import { ActivationComponent } from './containers/activation/activation.component'

import { SharedModule } from 'src/app/shared/shared.module'
import { environment } from '../../../environments/environment'

import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { AuthGuard } from './guards/auth.guard'

@NgModule({
  declarations: [LoginComponent, ActivationErrorComponent, ActivationComponent],
  imports: [
    CommonModule,
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
