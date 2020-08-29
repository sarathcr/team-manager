import {
  boolean,
  select,
  number,
  object,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import markDown from './error-toast.stories.md'
import { ErrorToastComponent } from './error-toast.component'
import { AlertModule } from 'ngx-bootstrap/alert'
storiesOf('Shared|Errot-toast', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ErrorToastComponent],
      imports: [AlertModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-error-toast class="error-toast"
    [type]="type"
    [dissmissble] ="dissmissble"
    [timeout]="timeout"
    [maxLimit]=" maxLimit"
    [errors]="errors"
    >
    </app-error-toast>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.error-toast{
     width: 500px;
     max-width:100%;
   }
 `,
    ],
    props: {
      type: select(
        'Type',
        ['-- select any type --', 'danger', 'info', 'warning', 'success'],
        'danger'
      ),
      dissmissble: boolean('Dissmissble Icon', false),
      timeout: number('Timeout', 10000),
      maxLimit: number('Maximum Limit', 3),
      errors: object('Error Status', [{ error: 'not found', status: '404' }]),
    },
  }))
