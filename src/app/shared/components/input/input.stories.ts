import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ValidatorComponent } from '../validator/validator.component'
import { InputComponent } from './input.component'
import markDown from './input.stories.md'

storiesOf('Shared|Input', module)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent, ValidatorComponent],
      imports: [
        ReactiveFormsModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
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
               [background]="background"
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
      background: select(
        'Label Background',
        ['-- select any label background --', 'white', 'white-lilac'],
        'white'
      ),
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
