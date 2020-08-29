import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { LoaderComponent } from '../loader/loader.component'
import { ButtonComponent } from './button.component'
import markDown from './button.stories.md'
storiesOf('Shared|Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent, LoaderComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="wrap">
    <app-button class="component" [theme] ="theme" [variant]="variant" [icon]="icon" [size]="size" [disabled]="disabled" [loading]="loading">
      {{label}}
    </app-button>
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
        ['primary', 'secondary', 'teritiary', 'success'],
        'primary'
      ),
      variant: select(
        'Select button variant',
        [
          'contained',
          'outlined',
          'text',
          'icon',
          'block',
          'back',
          'underlined',
        ],
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
        'left',
        'back',
        'calender',
        'three-dots',
      ]),
      label: text('Button label', 'Button text here'),
      size: select('Button size', ['default', 'small', 'medium'], 'default'),
      disabled: boolean('disabled', false),
      loading: boolean('loading', false),
    },
  }))
