import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { FormButtonComponent } from './form/components/form-button/form-button.component';
import { FormInputComponent } from './form/components/form-input/form-input.component';
import { DropdownComponent } from './form/components/dropdown/dropdown.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        NavComponent,
        LanguageSelectorComponent,
        FormButtonComponent,
        FormInputComponent,
        DropdownComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        NavComponent,
        LanguageSelectorComponent,
        DropdownComponent,
        FormInputComponent,
        FormButtonComponent
    ]
})

export class SharedModule {}
