import { TranslateModule } from '@ngx-translate/core'
import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from './../../utility/storybook-translate.module'
import { SwitchComponent } from './switch.component'
import markDown from './switch.stories.md'

storiesOf('Shared|Switch', module)
  .addDecorator(
    moduleMetadata({
      declarations: [SwitchComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="wrap">
    <app-switch 
      [switchOn]=switchOn 
      [textOn]=textOn 
      [textOff]=textOff
      [disabled]=disabled
      [type]=type
      [iconOne]="iconOne"
      [iconTwo]="iconTwo"
      [buttonTextOne]="buttonTextOne"
      [buttonTextTwo]="buttonTextTwo">
    </app-switch>
   <div>`,
    styles: [
      `.wrap{
        margin-top:150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    `,
    ],
    props: {
      textOn: text('textOn', 'On'),
      textOff: text('textOff', 'Off'),
      switchOn: boolean('Switch is On by default?', true),
      disabled: boolean('disabled', false),
      type: select('Type', ['default', 'button'], 'default'),
      iconOne: text('IconOne', 'icon-ic_star-grey'),
      iconTwo: text('IconTwo', 'icon-ic_star-no'),
      buttonTextOne: text('button text one', 'Text One'),
      buttonTextTwo: text('button text Two', 'Text Two'),
    },
  }))
