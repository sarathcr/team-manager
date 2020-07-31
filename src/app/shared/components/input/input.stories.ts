import { TranslateModule } from '@ngx-translate/core'
import { storiesOf, moduleMetadata } from '@storybook/angular'
import {
  withKnobs,
  select,
  boolean,
  text,
  number,
} from '@storybook/addon-knobs/angular'
import { action } from '@storybook/addon-actions'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import markDown from './input.stories.md'
import { ValidatorComponent } from '../validator/validator.component'
import { InputComponent } from './input.component'

storiesOf('Shared|Input', module)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent, ValidatorComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-input class="input" [variant]="variant"
               [placeholder]="placeholder"
               [label]="label"
               [value]="value"
               [maxlength]="maxlength"
               [initFocus]="initFocus"
               [helperText]="helperText"
               [enableValidator]="enableValidator"
               [errorText]="errorText"
               [error]="error"
               (inputChange)="inputChange($event)" >
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
      `.input {
        width: 500px;
        max-width: 100%;
       }`,
    ],
    props: {
      variant: select('Variant', [
        '-- select any variant --',
        'text',
        'email',
        'password',
      ]),
      placeholder: text('Placeholder', ''),
      label: text('Label', 'Input label'),
      value: text('Value'),
      maxlength: number('Maximun Length', 20),
      initFocus: boolean('Initial Focus', true),
      enableValidator: boolean('Enable Validator', false),
      error: boolean('Validator Error Trigger'),
      helperText: text('Validator Helper Message', 'Enter your inputs'),
      errorText: text('Validator Error Message', 'validation message here'),
      inputChange: action('You are enter this message'),
    },
  }))
