import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ActivationErrorComponent } from './modules/auth/containers/activation-error/activation-error.component'
import { ActivationComponent } from './modules/auth/containers/activation/activation.component'
import { ForgotPasswordComponent } from './modules/auth/containers/forgot-password/forgot-password.component'
import { LoginComponent } from './modules/auth/containers/login/login.component'
import { LogoutComponent } from './modules/auth/containers/logout/logout.component'
import { RegisterComponent } from './modules/auth/containers/register/register.component'
import { ResetPasswordComponent } from './modules/auth/containers/reset-password/reset-password.component'
import { NotFoundComponent } from './shared/components/not-found/not-found.component'

import { AuthGuard } from './modules/auth/guards/auth.guard'

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
    path: 'profile',
    loadChildren: () =>
      import('./modules/auth/modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./modules/project-editor/project-editor.module').then(
        (m) => m.ProjectEditorModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'output',
    loadChildren: () =>
      import('./modules/project-output/project-output.module').then(
        (m) => m.ProjectOuputModule
      ),
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
    redirectTo: 'editor/projects',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'not-found' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
