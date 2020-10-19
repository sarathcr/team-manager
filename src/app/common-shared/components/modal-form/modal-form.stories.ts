import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { number, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { TranslateOptions } from '../../pipe/translate-cut.pipe'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ButtonComponent } from '../button/button.component'
import { InputComponent } from '../input/input.component'
import { LoaderComponent } from '../loader/loader.component'
import { TextareaComponent } from '../textarea/textarea.component'
import { ValidatorComponent } from '../validator/validator.component'
import { ModalFormComponent } from './modal-form.component'
import markDown from './modal-form.stories.md'

storiesOf('Common-shared|Modal Form', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        LoaderComponent,
        ModalFormComponent,
        ValidatorComponent,
        InputComponent,
        TextareaComponent,
        ButtonComponent,
        TranslateOptions,
      ],
      imports: [
        ReactiveFormsModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#D6D6D6', default: true }],
    notes: markDown,
  })
  .add('Input', () => ({
    template: `<div class="story_layout_style">
    <app-modal-form class="modalform"
               [variant]="'input'"
               [title]="title"
               [data]="data"
               [label]="label"
               [confirmLabel]="confirmLabel"
               [maxLength]="maxLength"
               [helperText]="helperText"
               [errorText]="errorText"
               (decline)="decline($event)"
               (confirm)="confirm($event)">
              </app-modal-form>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modalform {
        width: 500px;
        max-width: 100%;
        background: #FFFFFF;
        border-radius: 0.3rem;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }`,
    ],
    props: {
      data: text('Data'),
      label: text('Label', 'Modal form label'),
      title: text('Title', 'Modal form title'),
      maxLength: number('Maximun Length'),
      confirmLabel: text('Confirm Button Label', 'Modal form Button'),
      helperText: text('Validator Helper Message', 'Enter your inputs'),
      errorText: text('Validator Error Message', 'validation message here'),
      decline: action('You are closed the modal info'),
      confirm: action('You are clicked on the submit button of modal form'),
    },
  }))
  .add('Textarea', () => ({
    template: `<div class="story_layout_style">
    <app-modal-form class="modalform"
               [variant]="'textarea'"
               [title]="title"
               [data]="data"
               [label]="label"
               [confirmLabel]="confirmLabel"
               [maxLength]="maxLength"
               [helperText]="helperText"
               [errorText]="errorText"
               (decline)="decline($event)"
               (confirm)="confirm($event)">
              </app-modal-form>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modalform {
        width: 500px;
        max-width: 100%;
        background: #FFFFFF;
        border-radius: 0.3rem;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }`,
    ],
    props: {
      data: text('Data'),
      label: text('Label', 'Modal form label'),
      title: text('Title', 'Modal form title'),
      maxLength: number('Maximun Length'),
      confirmLabel: text('Confirm Button Label', 'Modal form Button'),
      helperText: text('Validator Helper Message', 'Enter your inputs'),
      errorText: text('Validator Error Message', 'validation message here'),
      decline: action('You are closed the modal info'),
      confirm: action('You are clicked on the submit button of modal form'),
    },
  }))
