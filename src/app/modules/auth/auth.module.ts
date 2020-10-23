import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { TranslateModule } from '@ngx-translate/core'
import * as fromAuth from './reducers'

import { SocialLoginModule } from 'angularx-social-login'

import { ActivationErrorComponent } from './containers/activation-error/activation-error.component'
import { ActivationComponent } from './containers/activation/activation.component'
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component'
import { LoginComponent } from './containers/login/login.component'
import { RegisterComponent } from './containers/register/register.component'
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component'

import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'

import { AuthService } from 'src/app/modules/auth/services/auth/auth.service'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { UserResolver } from './resolvers/user-resolver.service'

import { AuthGuard } from './guards/auth.guard'

import { ProjectEditorStoreModule } from '../teacher/project-editor/store/project-editor-store.module'
import { StudentGuard } from './guards/student.gaurd'
import { TeacherGuard } from './guards/teacher.guard'
import { AuthStoreModule } from './store/auth-store.module'

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
    CommonSharedModule,
    SocialLoginModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    AuthStoreModule,
    ProjectEditorStoreModule,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthGuard,
        AuthService,
        UserService,
        UserResolver,
        TeacherGuard,
        StudentGuard,
      ],
    }
  }
}
