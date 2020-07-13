import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { HeaderComponent } from './components/header/header.component'
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import { TranslateModule } from '@ngx-translate/core'
// Components
import { ButtonComponent } from './components/button/button.component'
import { FormInputComponent } from './components/form-input/form-input.component'
import { DropdownComponent } from './components/dropdown/dropdown.component'
import { LoaderComponent } from './components/loader/loader.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { CheckBoxComponent } from './components/checkbox/checkbox.component'
import { TextareaComponent } from './components/textarea/textarea.component'
import { TextareaListComponent } from './components/textarea/textarea-list/textarea-list.component'
import { TranslateCut } from './pipe/translate-cut.pipe'

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        LanguageSelectorComponent,
        ButtonComponent,
        FormInputComponent,
        DropdownComponent,
        LoaderComponent,
        PaginationComponent,
        CheckBoxComponent,
        TextareaComponent,
        TextareaListComponent,
        TranslateCut
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        PaginationModule.forRoot(),
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
        LoaderComponent,
        PaginationComponent,
        CheckBoxComponent,
        TextareaComponent,
        TextareaListComponent,
        TranslateCut
    ],
})

export class SharedModule { }
