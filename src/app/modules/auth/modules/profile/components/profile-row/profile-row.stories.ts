import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { ProfileRowComponent } from './profile-row.component'
import markDown from './profile-row.stories.md'

storiesOf('Profile |Profile row', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterTestingModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ProfileRowComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
          <app-profile-row
          [label]="label"
          [data]="data">
          </app-profile-row>
   </div>`,
    styles: [
      `.story_layout_style {
          margin-top:100px;
          margin-bottom:100px;
          display:flex;
          justify-content:center;
          align-items: center;
      }`,
    ],
    props: {
      label: text('Label', 'label'),
      data: text('Data', 'data'),
    },
  }))
