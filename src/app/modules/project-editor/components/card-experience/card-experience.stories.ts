import { TranslateModule } from '@ngx-translate/core'

import { RouterModule } from '@angular/router'
import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { SwitchComponent } from 'src/app/shared/components/switch/switch.component'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { CardExperienceComponent } from './card-experience.component'
import markDown from './card-experience.stories.md'
storiesOf('Project-Editor|Card Experience', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CardExperienceComponent, SwitchComponent],
      imports: [
        StorybookTranslateModule,
        RouterModule.forRoot([], { useHash: true }),
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
    <app-card-experience
    [data]="data"
    [experienceType]="experienceType"
    [notification]="notification"
    [status]="status"
  >
  </app-card-experience>
   <div>`,
    styles: [
      `.story_layout_style {
              margin-top:50px;
              margin-bottom:100px;
              margin-left:500px;
              width:25%
        }`,
    ],
    props: {
      data: {
        id: text('Id', 1),
        title: text('Title', 'Lorem Ipsum'),
        creativeImage: text(
          'link',
          'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg'
        ),
      },
      status: select(
        'Status',
        ['inprogress', 'draft', 'done', 'readonly'],
        'inprogress'
      ),
      experienceType: text('Experience Type', 'UNIDAD DIDÁCTICA'),
      notification: boolean('Notification', false),
    },
  }))
