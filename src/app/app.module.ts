import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { LocalStorageService } from './services/localStorage.service';
// import { HomeComponent } from './home/home.component';
// import { ProjectEditorComponent } from './project-editor/project-editor.component';
// import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    PagesModule,
    SharedModule,
    ModulesModule,
    SharedModule
  ],
  providers: [
    LocalStorageService,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
