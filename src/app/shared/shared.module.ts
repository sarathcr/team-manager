import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { CreatorHeaderComponent } from './components/creator-header/creator-header.component';
import { NavComponent } from './components/nav/nav.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        SidebarComponent,
        CreatorHeaderComponent,
        NavComponent,
        LanguageSelectorComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild()
    ],
    exports: [
        SidebarComponent,
        CreatorHeaderComponent,
        NavComponent,
        LanguageSelectorComponent
    ]
})

export class SharedModule {}
