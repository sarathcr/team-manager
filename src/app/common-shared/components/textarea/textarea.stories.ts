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
import { TranslateOptions } from '../../pipe/translate-cut.pipe'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ValidatorComponent } from '../validator/validator.component'
import { TextareaComponent } from './textarea.component'
import markDown from './textarea.stories.md'

storiesOf('Common-shared|Textarea', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TextareaComponent, ValidatorComponent, TranslateOptions],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-textarea class="textarea"
    [placeholder] ="placeholder"
    [label]="label"
    [variant]="variant"
    [size]="size"
    [enableValidator]="enableValidator"
    [customClass]="customClass"
    [helperText]="helperText"
    [maxLength]="maxLength"
    [initFocus]="initfocus"
    [value]="value"
    [errorText]="errorText"
    [background]="background"
    (inputChange)="inputChange($event)">
    </app-textarea>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.textarea{
     width: 500px;
     max-width:100%;
   }
 `,
    ],
    props: {
      variant: select(
        'Variant',
        ['-- select any variant --', 'default', 'listItem'],
        'default'
      ),
      background: select(
        'Label Background',
        ['-- select any label background --', 'white', 'white-lilac'],
        'white'
      ),
      size: select('Size', ['-- select any variant --', 'small']),
      placeholder: text('Placeholder', ''),
      label: text('Label', 'Label'),
      value: text(' Value'),
      maxLength: number('Maximum Length', 20),
      customClass: text('Custom class', 'Add custom class to textarea'),
      enableValidator: boolean('Enable Validator', false),
      helperText: text('Validator Helper Message', 'Enter your inputs'),
      initfocus: boolean('Initail Focus', true),
      errorText: text('Validation Message', 'Validation message here'),
      inputChange: action('Your are enter this message'),
    },
  }))
