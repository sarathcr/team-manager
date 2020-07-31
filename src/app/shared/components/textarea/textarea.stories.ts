import { storiesOf, moduleMetadata } from '@storybook/angular'
import {
  withKnobs,
  select,
  boolean,
  text,
  number
} from '@storybook/addon-knobs/angular'
import { action } from '@storybook/addon-actions'
import markDown from './textarea.stories.md'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { TranslateModule } from '@ngx-translate/core'
import { TextareaComponent } from './textarea.component'
import { TextareaListComponent } from './textarea-list/textarea-list.component'
import { ValidatorComponent } from '../validator/validator.component'

storiesOf('Shared|Textarea', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TextareaComponent,
        TextareaListComponent,
        ValidatorComponent
      ],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()]
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown
  })
  .add('Default', () => ({
    template: `<div style="margin-top:100px; display:flex; justify-content:center; align-items: center">
    <app-textarea class="textarea"
    [placeholder] ="placeholder"
    [label]="label"
    [variant]="variant"
    [size]="size"
    [enableValidator]="enableValidator"
    [helperText]="helperText"
    [maxLength]="maxLength"
    [initFocus]="initfocus"
    [value]="value"
    [errorText]="errorText"
    (inputChange)="inputChange($event)">
    </app-textarea>
   </div>`,
    styles: [
      `
   .textarea{
     width: 500px;
     max-width:100%;
   }
 `
    ],
    props: {
      placeholder: text('Textarea placeholder', ''),
      label: text('Textarea label', 'Label'),
      variant: select(
        'Textarea variant',
        ['-- select any variant --', 'default', 'listItem'],
        'default'
      ),
      size: select('Textarea size', 
      ['-- select any variant --', 'small'],
      ),
      enableValidator: boolean('enableValidator', false),
      helperText: text('helperText of textarea', 'Enter your input here'),
      maxLength: number('Set your maximum length of textarea', 20),
      initfocus: boolean('initfocus', true),
      value: text('Sample value of textarea', ' This is a sample value of textarea'),
      errorText: text('Validation message', 'Validation message here'),
      inputChange: action('Textarae value')
    }
  }))
