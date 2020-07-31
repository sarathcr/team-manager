import { TranslateModule } from '@ngx-translate/core'
import { storiesOf, moduleMetadata } from '@storybook/angular'
import {
  withKnobs,
  number,
  boolean,
  text,
  select,
} from '@storybook/addon-knobs/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import markDown from './validator.stories.md'
import { ValidatorComponent } from './validator.component'
import { InputComponent } from '../input/input.component'

storiesOf('Shared|Validator', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ValidatorComponent, InputComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
              <app-input class="validator"
               [variant]="variant"
               [value]="value"
               [maxlength]="maxlength"
               [helperText]="helperText"
               [enableValidator]="isEnabled"
               [errorText]="errorText"
               [error]="error"
                >
              </app-input>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.validator {
        width: 500px;
        max-width: 100%;
       }`,
    ],
    props: {
      variant: select('Variant', ['counter', 'text'], 'counter'),
      value: text('Value'),
      maxlength: number('Maximun Length', 70),
      isEnabled: boolean('Enable Validator', true),
      error: boolean('Trigger Error', false),
      helperText: text('Helper Message', 'Enter your inputs'),
      errorText: text('Error Message', 'validation message here'),
    },
  }))
