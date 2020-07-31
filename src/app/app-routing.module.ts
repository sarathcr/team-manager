import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { NotFoundComponent } from './shared/components/not-found/not-found.component'
import { LoginComponent } from './modules/auth/containers/login/login.component'
import { LogoutComponent } from './modules/auth/containers/logout/logout.component'
import { ActivationErrorComponent } from './modules/auth/containers/activation-error/activation-error.component'
import { ActivationComponent } from './modules/auth/containers/activation/activation.component'

import { AuthGuard } from './modules/auth/guards/auth.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
      import(
        './modules/project-editor/modules/project-output/project-output.module'
      ).then((m) => m.ProjectOuputModule),
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
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'login' },
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
