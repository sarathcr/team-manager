import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'

import { withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { LoaderComponent } from '../loader/loader.component'
import { MaterialCardComponent } from '../material-card/material-card.component'
import { SwitchComponent } from '../switch/switch.component'
import { MaterialLinkComponent } from './material-link.component'
import markDown from './material-link.stories.md'
storiesOf('Shared|Material Link', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        MaterialLinkComponent,
        MaterialCardComponent,
        SwitchComponent,
        LoaderComponent,
      ],
      imports: [StorybookTranslateModule, TranslateModule.forRoot(), HttpClientModule],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `
      <div class="story_layout_style">
        <app-material-link linkTitle="title" (updateStatus)="updateStatus($event)"></app-material-link>
      <div>
    `,
    styles: [
      `
        .story_layout_style {
          margin-top:100px;
          margin-bottom:100px;
          margin-left:100px;
          margin-right:100px;   
        }
      `,
    ],
    props: {
      updateStatus: action('status')
    }
  }))
