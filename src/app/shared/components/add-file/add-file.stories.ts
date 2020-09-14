import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { HttpClientModule } from '@angular/common/http'
import { action } from '@storybook/addon-actions'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'

import { number, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'

import { AddFileComponent } from './add-file.component'
import markDown from './add-file.stories.md'
storiesOf('Shared|Add File', module)
  .addDecorator(
    moduleMetadata({
      declarations: [AddFileComponent, LoaderComponent],
      imports: [
        NgxDropzoneModule,
        HttpClientModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-add-file></app-add-file>
   <div>`,
    styles: [
      `.story_layout_style {
              margin-top:100px;
              margin-bottom:100px;
              margin-left:100px;
              margin-right:100px;   
        }`,
    ],
    props: {
      label: text('Label', 'Cargar archivo'),
      maxFileSize: number('maxFile Size', 5242880),
      acceptedType: text('accepted Type', 'image/jpeg,image/jpg,image/png'),
      fileSelect: action('Your are enter this message'),
    },
  }))
