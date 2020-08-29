import { withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { InfoToolTipComponent } from './info-tooltip.component'
import markDown from './info-tooltip.stories.md'

storiesOf('Shared|Information Tooltip', module)
  .addDecorator(
    moduleMetadata({
      declarations: [InfoToolTipComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <div>
      <h1 class="h1-text">
          <span>1.</span>Producto final
          <app-info-tooltip class="info-tooltip">
          </app-info-tooltip>
      </h1>
    </div>
    
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.h1-text{
        display: flex;
        font-family:Museo Sans Rounded, sans-serif;
        font-size:24px; 
        letter-spacing: 0.3px;
        font-weight: 900;
       }`,
      `.info-tooltip {
        margin-left: 10px;
       }`,
    ],
    props: {
      // no properties are implemented yet
    },
  }))
