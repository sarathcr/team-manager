import { storiesOf, moduleMetadata } from '@storybook/angular'
import {
  withKnobs,
  select,
  boolean,
  text,
} from '@storybook/addon-knobs/angular'
import markDown from './button.stories.md'
import { ButtonComponent } from './button.component'

storiesOf('Shared|Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="wrap">
    <app-button class="component" [theme] ="theme" [variant]="variant" [icon]="icon" [size]="size" [disabled]="disabled">{{label}}</app-button>
   </div>`,
    styles: [
      `.wrap{
        margin-top:100px;
      }
      .wrap .component{
        display: flex;
        justify-content: center;
      }`,
    ],
    props: {
      theme: select(
        'Select button theme',
        ['primary', 'secondary', 'success'],
        'primary'
      ),
      variant: select(
        'Select button variant',
        ['contained', 'outlined', 'text', 'icon', 'block'],
        'contained'
      ),
      icon: select('Button icon', [
        '-- select button icon --',
        'tick',
        'add',
        'locked',
        'view',
        'zoomIn',
        'zoomOut',
        'download',
        'print',
        'google',
      ]),
      label: text('Button label', 'Button text here'),
      size: select('Button size', ['default', 'small', 'medium'], 'default'),
      disabled: boolean('disabled', false),
    },
  }))
