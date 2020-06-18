import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { ButtonComponent } from './components/button/button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        LanguageSelectorComponent,
        ButtonComponent,
        FormInputComponent,
        DropdownComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        LanguageSelectorComponent,
        DropdownComponent,
        FormInputComponent,
        ButtonComponent,
        LoaderComponent
    ]
})

export class SharedModule { }
