import { select, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StepStatusComponent } from './step-status.component'
import markDown from './step-status.stories.md'

storiesOf('Project-Editor|Step Status', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StepStatusComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-step-status  class="step-status" 
                [status]="status">
    </app-step-status>
   </div>`,
    styles: [
      `.story_layout_style {
          height: 500px;
          display:flex;
          justify-content:center;
          align-items: center;
    }`,
      `.step-status {
          position: absolute;
          height: 100%;
          max-width: 100%;
     }`,
    ],
    props: {
      status: select('Status', ['INPROCESS', 'DONE', 'PENDING']),
    },
  }))
