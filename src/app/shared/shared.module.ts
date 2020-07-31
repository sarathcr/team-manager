import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component'
import { MainHeaderComponent } from './components/main-header/main-header.component'
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'

// lib's
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal'

// Components
import { ButtonComponent } from './components/button/button.component'
import { FormInputComponent } from './components/form-input/form-input.component'
import { DropdownComponent } from './components/dropdown/dropdown.component'
import { LoaderComponent } from './components/loader/loader.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { CheckBoxComponent } from './components/checkbox/checkbox.component'
import { InfoToolTipComponent } from './components/info-tooltip/info-tooltip.component'
import { TextareaComponent } from './components/textarea/textarea.component'
import { TextareaListComponent } from './components/textarea/textarea-list/textarea-list.component'
import { TranslateCut } from './pipe/translate-cut.pipe'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { ValidatorComponent } from './components/validator/validator.component'
import { EditableListComponent } from './components/editable-list/editable-list.component'
import { ModalInfoComponent } from './components/modal-info/modal-info.component'
import { ModalFormComponent } from './components/modal-form/modal-form.component'
import { InputComponent } from './components/input/input.component'
import { LayoutCoverComponent } from './components/layout-cover/layout-cover.component'
@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    LanguageSelectorComponent,
    ButtonComponent,
    FormInputComponent,
    DropdownComponent,
    LoaderComponent,
    PaginationComponent,
    CheckBoxComponent,
    InfoToolTipComponent,
    TextareaComponent,
    TextareaListComponent,
    TranslateCut,
    NotFoundComponent,
    LayoutCoverComponent,
    InputComponent,
    ValidatorComponent,
    EditableListComponent,
    ModalInfoComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    RouterModule
  ],
  exports: [
    MainHeaderComponent,
    MainSidebarComponent,
    LanguageSelectorComponent,
    DropdownComponent,
    FormInputComponent,
    ButtonComponent,
    LoaderComponent,
    PaginationComponent,
    CheckBoxComponent,
    InfoToolTipComponent,
    TextareaComponent,
    TextareaListComponent,
    TranslateCut,
    LayoutCoverComponent,
    InputComponent,
    ValidatorComponent,
    EditableListComponent,
    ModalInfoComponent,
    ModalFormComponent
  ],
  providers: [
    BsModalRef
  ]
})

export class SharedModule { }
