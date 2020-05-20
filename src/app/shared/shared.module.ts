import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { FormButtonComponent } from './form/components/form-button/form-button.component';
import { FormInputComponent } from './form/components/form-input/form-input.component';
import { FormComponent } from './form/containers/form/form.component';
// Directives
// import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { FieldDirective } from './form/components/field/field.directive';
import { DropdownComponent } from './form/components/dropdown/dropdown.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        NavComponent,
        LanguageSelectorComponent,
        FormButtonComponent,
        FormInputComponent,
        FieldDirective,
        FormComponent,
        DropdownComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        NgMultiSelectDropDownModule
    ],
    entryComponents: [
      FormButtonComponent,
      FormInputComponent,
      DropdownComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        NavComponent,
        LanguageSelectorComponent,
        FormComponent,
        DropdownComponent
    ]
})

export class SharedModule {}
