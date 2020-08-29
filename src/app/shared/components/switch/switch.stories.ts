import { TranslateModule } from '@ngx-translate/core'
import { boolean, text, withKnobs } from '@storybook/addon-knobs/angular'
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
    template: `<div>
    <app-switch 
      [switchOn]=switchOn 
      [textOn]=textOn 
      [textOff]=textOff
      [disabled]=disabled>
    </app-switch>
   <div>`,
    styles: [],
    props: {
      textOn: text('textOn', 'On'),
      textOff: text('textOff', 'Off'),
      switchOn: boolean('Switch is On by default?', true),
      disabled: boolean('disabled', false),
    },
  }))
