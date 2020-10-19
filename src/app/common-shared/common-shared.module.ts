import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { NgScrollbarModule } from 'ngx-scrollbar'

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import { MainHeaderComponent } from './components/main-header/main-header.component'
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component'

// lib's
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login'
import { AlertModule } from 'ngx-bootstrap/alert'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { NgxDropzoneModule } from 'ngx-dropzone'
// Components
import { ButtonComponent } from './components/button/button.component'
import { CheckboxComponent } from './components/checkbox/checkbox.component'
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component'
import { DropdownComponent } from './components/dropdown/dropdown.component'
import { ErrorToastComponent } from './components/error-toast/error-toast.component'
import { ImageUploadComponent } from './components/image-upload/image-upload.component'
import { InfoToolTipComponent } from './components/info-tooltip/info-tooltip.component'
import { InputComponent } from './components/input/input.component'
import { LoaderComponent } from './components/loader/loader.component'
import { ModalFormComponent } from './components/modal-form/modal-form.component'
import { ModalInfoComponent } from './components/modal-info/modal-info.component'
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { RadioComponent } from './components/radio/radio.component'
import { SelectComponent } from './components/select/select.component'
import { SwitchComponent } from './components/switch/switch.component'
import { TabsetComponent } from './components/tabset/tabset.component'
import { TextareaComponent } from './components/textarea/textarea.component'
import { ValidatorComponent } from './components/validator/validator.component'

// Pipes
import { SafePipe } from './pipe/safe.pipe'
import {
  TranslateConcat,
  TranslateCut,
  TranslateOptions,
} from './pipe/translate-cut.pipe'

// Services
import { AwsImgUploadService } from './services/aws-img-upload/aws-img-upload.service'
import { GoogleAuthService } from './services/google/google-auth.service'
import { GoogleFileService } from './services/google/google-file.service'

// Environment
import { environment } from 'src/environments/environment'

import { CheckCount } from '../modules/teacher/project-editor/pipes/check-count.pipe'
import { LayoutCoverComponent } from './components/layout-cover/layout-cover.component'
import { ReversePipe } from './pipe/reverse.pipe'
@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    LanguageSelectorComponent,
    ButtonComponent,
    SelectComponent,
    LoaderComponent,
    PaginationComponent,
    InfoToolTipComponent,
    TextareaComponent,
    TranslateCut,
    TranslateOptions,
    TranslateConcat,
    NotFoundComponent,
    InputComponent,
    ValidatorComponent,
    ModalInfoComponent,
    ModalFormComponent,
    ErrorToastComponent,
    SwitchComponent,
    CheckboxComponent,
    ImageUploadComponent,
    ModalLayoutComponent,
    TabsetComponent,
    DropdownComponent,
    DropdownSelectComponent,
    SafePipe,
    RadioComponent,
    CheckCount,
    ReversePipe,
    LayoutCoverComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    RouterModule,
    AlertModule.forRoot(),
    NgxDropzoneModule,
    NgScrollbarModule,
  ],
  exports: [
    MainHeaderComponent,
    CheckboxComponent,
    MainSidebarComponent,
    LanguageSelectorComponent,
    SelectComponent,
    ButtonComponent,
    LoaderComponent,
    PaginationComponent,
    InfoToolTipComponent,
    TextareaComponent,
    TranslateCut,
    TranslateOptions,
    TranslateConcat,
    InputComponent,
    ValidatorComponent,
    ModalInfoComponent,
    ModalFormComponent,
    ErrorToastComponent,
    ImageUploadComponent,
    SwitchComponent,
    ModalLayoutComponent,
    TabsetComponent,
    DropdownComponent,
    DropdownSelectComponent,
    SafePipe,
    CheckCount,
    ReversePipe,
    RadioComponent,
    LayoutCoverComponent,
  ],
  providers: [
    BsModalRef,
    AwsImgUploadService,
    GoogleAuthService,
    GoogleFileService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleId,
              environment.googleLoginOptions
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class CommonSharedModule {}
