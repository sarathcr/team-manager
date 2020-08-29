import { select, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { LoaderComponent } from './loader.component'
import markDown from './loader.stories.md'

storiesOf('Shared|Loader', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoaderComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [
      { name: 'dark background', value: '#d6d6d673', default: true },
    ],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div>
    <app-loader [variant]="variant" [theme]="theme" [size]="size"></app-loader>
   </div>`,
    props: {
      variant: select('Select loader variant', ['block', 'default'], 'default'),
      theme: select(
        'Select loader theme',
        ['primary', 'secondary', 'teritiary'],
        'primary'
      ),
      size: select('Select loader size', ['small', 'medium', 'large'], 'large'),
    },
  }))
