import { TranslateModule } from '@ngx-translate/core'
import { withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { FilterComponent } from './filter.component'
import markDown from './filter.stories.md'

storiesOf('Shared|Filter', module)
  .addDecorator(
    moduleMetadata({
      declarations: [FilterComponent],
      imports: [TranslateModule.forRoot(), StorybookTranslateModule],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <div>
        <app-filter class="app-filter">
        </app-filter>
    </div>
    
   </div>`,
    styles: [
      `.story_layout_style {
        margin-left:20px;
        justify-content:center;
        align-items: center;
      }`,
      `.app-filter {
        margin-left: 20px;
       }`,
    ],
    props: {
      // no properties are implemented yet
    },
  }))
