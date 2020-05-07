import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { CreatorHeaderComponent } from './components/creator-header/creator-header.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
    declarations: [
        SidebarComponent,
        CreatorHeaderComponent,
        NavComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SidebarComponent,
        CreatorHeaderComponent,
        NavComponent
    ]
})

export class SharedModule {}
