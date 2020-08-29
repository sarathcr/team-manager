import { HttpClientModule } from '@angular/common/http'
import { files, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'
import { LayoutCoverComponent } from './layout-cover.component'
import markDown from './layout-cover.stories.md'

storiesOf('Shared|Layout Cover', module)
  .addDecorator(
    moduleMetadata({
      imports: [NgxDropzoneModule, HttpClientModule],
      declarations: [LayoutCoverComponent, LoaderComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div>
          <app-layout-cover
                      [img]="img">
          </app-layout-cover>
   </div>`,
    props: {
      img: files('Image', '.png', ['./assets/images/img_login.png']),
    },
  }))
