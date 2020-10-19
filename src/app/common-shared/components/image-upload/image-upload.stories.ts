import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import {
  boolean,
  number,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgxDropzoneModule } from 'ngx-dropzone'

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'

import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { ModalInfoComponent } from 'src/app/common-shared/components/modal-info/modal-info.component'
import { ImageUploadComponent } from './image-upload.component'

import markDown from './image-upload.stories.md'

storiesOf('Common-shared|Image Upload', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        NgxDropzoneModule,
        HttpClientModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
      ],
      declarations: [
        ButtonComponent,
        ImageUploadComponent,
        LoaderComponent,
        ModalInfoComponent,
      ],
      providers: [BsModalService],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
          <app-image-upload
                      [maxFileSize]="maxFileSize"
                      [acceptedType]="acceptedType"
                      [label]="label"
                      [jsonCopy]="false"
                      uploadPath="uploadPath"
                      (fileSelect)="fileSelect($event)">
          </app-image-upload>
   </div>`,
    styles: [
      `.story_layout_style {
          margin-top:100px;
          margin-bottom:100px;
          display:flex;
          justify-content:center;
          align-items: center;
      }`,
    ],
    props: {
      label: text('Label', 'Cargar archivo'),
      maxFileSize: number('maxFile Size', 5242880),
      acceptedType: text('accepted Type', 'image/jpeg,image/jpg,image/png'),
      fileSelect: action('Your are enter this message'),
      jsonCopy: boolean('jsonCopy', false),
      uploadPath: text('Upload Path', 'creative-images/'),
    },
  }))
