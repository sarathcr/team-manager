import { TranslateModule } from '@ngx-translate/core'
import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { PresentationCardComponent } from './presentation-card.component'
import markDown from './presentation-card.stories.md'

storiesOf('Shared|Presentation Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PresentationCardComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-presentation-card class="presentation-card"
    [variant]="variant"
    [isPremium]="isPremium"
    [title]="title"
    [imageURL]="imageURL"
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
        width: 266px;
   }
 `,
    ],
    props: {
      variant: select(
        'Variant',
        ['-- select any variant --', 'default', 'create'],
        'default'
      ),
      isPremium: boolean('Enable Premium', false),
      title: text('Title', 'Default Card Caption'),
      imageURL: text(
        'imageURL',
        'https://images.pexels.com/photos/3469600/pexels-photo-3469600.jpeg'
      ),
    },
  }))
