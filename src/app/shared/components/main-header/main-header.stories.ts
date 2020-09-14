import { TranslateModule } from '@ngx-translate/core'
import { text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { LoaderComponent } from '../loader/loader.component'
import markDown from '../main-header/main-header.stories.md'
import { MainHeaderComponent } from './main-header.component'

storiesOf('Shared|Private Home Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent, MainHeaderComponent, LoaderComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],

    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-main-header class="header"
      [imgUrl]="imgUrl"
      [buttonText]="buttonText"
      >
    </app-main-header>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.header {
        max-width: 100%;
       }`,
    ],
    props: {
      imgUrl: text(
        'imgUrl',
        'https://images.pexels.com/photos/3469600/pexels-photo-3469600.jpeg'
      ),
      buttonText: text('buttonText', 'Button Text'),
    },
  }))
