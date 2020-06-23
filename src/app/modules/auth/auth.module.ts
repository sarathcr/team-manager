import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import * as fromAuth from './reducers'
import { LoginComponent } from './components/login/login.component'
import { RouterModule } from '@angular/router'



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers)
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: []
    }
  }
}
