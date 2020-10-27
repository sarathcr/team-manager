import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import {
  boolean,
  object,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ValidatorComponent } from '../validator/validator.component'
import { ChipsetComponent } from './chipset.component'
import markDown from './chipset.stories.md'

const minDate = new Date()
const maxDate = new Date(
  minDate.getFullYear() + 10,
  minDate.getMonth(),
  minDate.getDate()
)

storiesOf('Common-shared|Chipset', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ChipsetComponent, ValidatorComponent],
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
    <app-chipset class="input"
               [chips]="chips"
               [invalidChips]="invalidChips"
               [label]="label"
               [initFocus]="initFocus"
               [placeholder]="placeholder"
               [variant]="variant"
               (chipset)="chipset($event)" >
              </app-chipset>
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
      chips: object('Chips', ['test@opentrends.net']),
      invalidChips: object('invalidChips', ['test@opentrends']),
      label: text('Label', 'Email/s'),
      initFocus: boolean('Initial Focus', true),
      placeholder: text(
        'Placeholder',
        'Escribe o pega el listado de e-mails de los docentes que quieras invitar'
      ),
      variant: select('Select variant', ['email'], 'email'),
      chipset: action('You are enter this message'),
    },
  }))
