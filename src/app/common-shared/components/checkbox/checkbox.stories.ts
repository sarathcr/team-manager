import { TranslateModule } from '@ngx-translate/core'
import { boolean, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ModalModule } from 'ngx-bootstrap/modal'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { CheckboxComponent } from './checkbox.component'
import markDown from './checkbox.stories.md'

storiesOf('Common-shared|Checkbox', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CheckboxComponent],
      imports: [
        StorybookTranslateModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })

  // Default checkbox
  .add('Default', () => ({
    template: `
      <div class="story_layout_style">
        <app-checkbox
          class="checkbox"
          [isChecked]="isChecked"
          [disabled]="isDisabled"
        >
          <div>Lorem Ipsum</div>
        </app-checkbox>
      </div>
    `,

    styles: [
      `
        .story_layout_style {
          display:flex;
          justify-content:center;
          align-items: center;
        }
      `,
      `
        .checkbox{
          width: 900px;
          max-width:100%;
        }
      `,
    ],
    props: {
      isChecked: boolean('Is Checked', false),
      disabled: boolean('Disabled', false),
    },
  }))
