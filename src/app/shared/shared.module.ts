import { SidebarComponent } from './../shared/sidebar/sidebar.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CreatorHeaderComponent } from './creator-header/creator-header.component';

@NgModule({
    declarations: [
        SidebarComponent,
        CreatorHeaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SidebarComponent,
        CreatorHeaderComponent
    ]
})

export class SharedModule {}