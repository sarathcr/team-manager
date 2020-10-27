import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'

import { ButtonComponent } from '../../../../common-shared/components/button/button.component'
import { SwitchComponent } from '../../../../common-shared/components/switch/switch.component'
import { MaterialCardComponent } from '../material-card/material-card.component'
import { AddFileComponent } from './add-file.component'
import markDown from './add-file.stories.md'
storiesOf('Shared|Add File', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        AddFileComponent,
        LoaderComponent,
        ButtonComponent,
        MaterialCardComponent,
        SwitchComponent,
      ],
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
    <app-add-file [acceptedType]="acceptedType" [entityType]=""></app-add-file>
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
      acceptedType: text('accepted Type', 'image/jpeg,image/jpg,image/png'),
      entityType: select(
        'Entity type',
        ['activity', 'exercise', 'instrument'],
        'activity'
      ),
    },
  }))
