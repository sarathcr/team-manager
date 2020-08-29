import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import { MainHeaderComponent } from './components/main-header/main-header.component'
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component'

// lib's
import { AlertModule } from 'ngx-bootstrap/alert'
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { NgxDropzoneModule } from 'ngx-dropzone'
// Components
import { ButtonComponent } from './components/button/button.component'
import { CheckboxComponent } from './components/checkbox/checkbox.component'
import { DetailsSelectorComponent } from './components/details-selector/details-selector.component'
import { DropdownComponent } from './components/dropdown/dropdown.component'
import { EditableListComponent } from './components/editable-list/editable-list.component'
import { ErrorToastComponent } from './components/error-toast/error-toast.component'
import { ExercisesCardComponent } from './components/exercises-card/exercises-card.component'
import { GoogleCardComponent } from './components/google-card/google-card.component'
import { ImageUploadComponent } from './components/image-upload/image-upload.component'
import { InfoToolTipComponent } from './components/info-tooltip/info-tooltip.component'
import { InputComponent } from './components/input/input.component'
import { LayoutCoverComponent } from './components/layout-cover/layout-cover.component'
import { LoaderComponent } from './components/loader/loader.component'
import { MaterialCardComponent } from './components/material-card/material-card.component'
import { MaterialLinkComponent } from './components/material-link/material-link.component'
import { ModalFormComponent } from './components/modal-form/modal-form.component'
import { ModalInfoComponent } from './components/modal-info/modal-info.component'
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { PresentationCardComponent } from './components/presentation-card/presentation-card.component'
import { SwitchComponent } from './components/switch/switch.component'
import { TabsetComponent } from './components/tabset/tabset.component'
import { TextareaComponent } from './components/textarea/textarea.component'
import { ValidatorComponent } from './components/validator/validator.component'
import { TranslateCut, TranslateOptions } from './pipe/translate-cut.pipe'
import { AwsImgUploadService } from './services/aws-img-upload/aws-img-upload.service'
@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    LanguageSelectorComponent,
    ButtonComponent,
    DropdownComponent,
    LoaderComponent,
    PaginationComponent,
    InfoToolTipComponent,
    TextareaComponent,
    TranslateCut,
    TranslateOptions,
    NotFoundComponent,
    LayoutCoverComponent,
    InputComponent,
    ValidatorComponent,
    EditableListComponent,
    ModalInfoComponent,
    ModalFormComponent,
    ErrorToastComponent,
    SwitchComponent,
    CheckboxComponent,
    ImageUploadComponent,
    ModalLayoutComponent,
    DetailsSelectorComponent,
    MaterialCardComponent,
    TabsetComponent,
    PresentationCardComponent,
    GoogleCardComponent,
    ExercisesCardComponent,
    MaterialLinkComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    RouterModule,
    AlertModule.forRoot(),
    NgxDropzoneModule,
  ],
  exports: [
    MainHeaderComponent,
    CheckboxComponent,
    MainSidebarComponent,
    LanguageSelectorComponent,
    DropdownComponent,
    ButtonComponent,
    LoaderComponent,
    PaginationComponent,
    InfoToolTipComponent,
    TextareaComponent,
    TranslateCut,
    TranslateOptions,
    LayoutCoverComponent,
    InputComponent,
    ValidatorComponent,
    EditableListComponent,
    ModalInfoComponent,
    ModalFormComponent,
    ErrorToastComponent,
    ImageUploadComponent,
    SwitchComponent,
    DetailsSelectorComponent,
    ModalLayoutComponent,
    MaterialCardComponent,
    TabsetComponent,
    PresentationCardComponent,
    GoogleCardComponent,
    ExercisesCardComponent,
    MaterialLinkComponent,
  ],
  providers: [BsModalRef, AwsImgUploadService],
})
export class SharedModule {}
