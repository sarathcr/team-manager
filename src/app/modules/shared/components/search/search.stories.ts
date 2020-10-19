import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { SearchComponent } from './search.component'
import markDown from './search.stories.md'

storiesOf('Shared|Search', module)
  .addDecorator(
    moduleMetadata({
      declarations: [SearchComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-search class="search"
    [placeholder] ="placeholder"
    [text]="text"
    (searchText)="searchText($event)" >
    </app-search>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.search{
     width: 500px;
     max-width:100%;
   }
 `,
    ],
    props: {
      text: text('Text', ''),
      placeholder: text('Placeholder', 'Placeholder'),
      searchText: action('The text you are searching is'),
    },
  }))
