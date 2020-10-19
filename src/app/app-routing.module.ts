import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NotFoundComponent } from './common-shared/components/not-found/not-found.component'
import { ActivationErrorComponent } from './modules/auth/containers/activation-error/activation-error.component'
import { ActivationComponent } from './modules/auth/containers/activation/activation.component'
import { ForgotPasswordComponent } from './modules/auth/containers/forgot-password/forgot-password.component'
import { LoginComponent } from './modules/auth/containers/login/login.component'
import { LogoutComponent } from './modules/auth/containers/logout/logout.component'
import { RegisterComponent } from './modules/auth/containers/register/register.component'
import { ResetPasswordComponent } from './modules/auth/containers/reset-password/reset-password.component'

import { AuthGuard } from './modules/auth/guards/auth.guard'
import { TeacherGuard } from './modules/auth/guards/teacher.guard'
import { UserResolver } from './modules/auth/resolvers/user-resolver.service'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: ':userId/:token',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile/setup',
    loadChildren: () => {
      if (localStorage.getItem('PROFILE') === 'TEACHER') {
        return import(
          './modules/teacher/profile-setup/profile-setup.module'
        ).then((m) => m.ProfileSetupModule)
      } else {
        return import(
          './modules/student/profile-setup/profile-setup.module'
        ).then((m) => m.ProfileSetupModule)
      }
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => {
      const token =
        localStorage.getItem('JWT_TOKEN') || sessionStorage.getItem('JWT_TOKEN')
      if (token && JSON.parse(atob(token.split('.')[1]))?.profile) {
        return import('./modules/teacher/profile/profile.module').then(
          (m) => m.ProfileModule
        )
      } else {
        return import('./modules/student/profile/profile.module').then(
          (m) => m.ProfileModule
        )
      }
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./modules/teacher/project-editor/project-editor.module').then(
        (m) => m.ProjectEditorModule
      ),
    canActivate: [AuthGuard, TeacherGuard],
  },
  {
    path: 'output',
    loadChildren: () =>
      import('./modules/project-output/project-output.module').then(
        (m) => m.ProjectOuputModule
      ),
    resolve: { UserResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'activation',
    component: ActivationComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'activation-error',
    component: ActivationErrorComponent,
  },
  {
    path: 'reset-password/:userId/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'recovery-password-error',
    component: ActivationErrorComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: '',
    redirectTo: 'editor/experiences',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'not-found' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
