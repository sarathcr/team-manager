import { TranslateModule } from '@ngx-translate/core'

import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { GoogleCardComponent } from './google-card.component'
import markDown from './google-card.stories.md'
storiesOf('shared|Google Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [GoogleCardComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-google-card 
      [title]="title" 
      [subtitle]="subtitle" 
      [variant]="variant"
    >
    </app-google-card>
   <div>`,
    styles: [
      `.story_layout_style {
        margin: auto;
       margin-top:50px;
       margin-bottom:50px;
       max-width: 215px;
     }`,
    ],
    props: {
      title: text('Title', 'Presentación'),
      subtitle: text('Subtitle', 'Google Slides'),
      variant: select(
        'Variant',
        ['slide', 'site', 'doc', 'form', 'sheet'],
        'slide'
      ),
    },
  }))
