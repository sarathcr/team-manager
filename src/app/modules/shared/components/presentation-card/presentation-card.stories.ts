import { TranslateModule } from '@ngx-translate/core'
import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'

import { PresentationCardComponent } from './presentation-card.component'
import markDown from './presentation-card.stories.md'

storiesOf('Shared|Presentation Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PresentationCardComponent, LoaderComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-presentation-card class="presentation-card" [ngClass]="{'presentation-card_sm' :iconVariant}"
    [variant]="variant"
    [isPremium]="isPremium"
    [isComingSoon]="isComingSoon"
    [title]="title"
    [premiumLabel]="premiumLabel"
    [imageURL]="imageURL"
    [description]="description"
    [iconVariant]="iconVariant"
    >
    </app-presentation-card>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.presentation-card{
        width: 161px;
   }`,
      `.presentation-card_sm{
     width: 185px;
   }`,
    ],
    props: {
      variant: select(
        'Variant',
        ['-- select any variant --', 'default', 'create', 'project'],
        'default'
      ),
      isPremium: boolean('Enable Premium', false),
      isComingSoon: boolean('Enable Coming Soon', false),
      title: text('Title', 'Default Card Caption'),
      premiumLabel: text('Premium/Coming Soon Label', 'premiumLabel'),
      imageURL: text(
        'imageURL',
        'https://images.pexels.com/photos/3469600/pexels-photo-3469600.jpeg'
      ),
      description: text('Description', 'description'),
      iconVariant: select(
        'Icon Variant',
        [
          '-- select any variant --',
          'PRESENTATION',
          'WEB',
          'DOCUMENT',
          'FORM',
          'SHEET',
          'RUBRICA',
          'CHECKLIST',
          'DIANA',
          '',
        ],
        ''
      ),
    },
  }))
