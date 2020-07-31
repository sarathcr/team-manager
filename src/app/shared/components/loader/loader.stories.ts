import { storiesOf, moduleMetadata } from '@storybook/angular'
import { withKnobs, select } from '@storybook/addon-knobs/angular'
import markDown from './loader.stories.md'
import { LoaderComponent } from './loader.component'

storiesOf('Shared|Loader', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoaderComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div>
    <app-loader [variant]="variant"></app-loader>
   </div>`,
    props: {
      variant: select('Select loader variant', ['block', 'default'], 'default'),
    },
  }))
