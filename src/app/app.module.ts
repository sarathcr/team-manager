import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// ngx translate
import { TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { metaReducers, appReducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { CoreModule } from './core/core.module';

// AoT requires an exported function for factories
export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/project-editor/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
    AuthModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(
      appReducers, {
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
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  providers: [
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
