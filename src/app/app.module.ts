import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { metaReducers, appReducers } from './state';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AuthModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(
      appReducers,{
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
