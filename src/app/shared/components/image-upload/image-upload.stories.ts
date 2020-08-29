import { NgxDropzoneModule } from 'ngx-dropzone'
import { number, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ImageUploadComponent } from './image-upload.component'
import markDown from './image-upload.stories.md'
import { HttpClientModule } from '@angular/common/http'
import { action } from '@storybook/addon-actions'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'

storiesOf('Shared|Image Upload', module)
  .addDecorator(
    moduleMetadata({
      imports: [NgxDropzoneModule, HttpClientModule],
      declarations: [ImageUploadComponent, LoaderComponent],
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
    },
  }))
