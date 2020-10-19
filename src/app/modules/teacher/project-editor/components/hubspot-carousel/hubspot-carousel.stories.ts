import { withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'

import { CarouselModule } from 'ngx-bootstrap/carousel'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { HubspotCarouselComponent } from './hubspot-carousel.component'
import markDown from './hubspot-carousel.stories.md'
storiesOf('Project-Editor|  Carousel', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        HubspotCarouselComponent,
        ButtonComponent,
        LoaderComponent,
      ],
      imports: [CarouselModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-hubspot-carousel></app-hubspot-carousel>
   <div>`,
    styles: [
      `.story_layout_style {
            
        }`,
    ],
    props: {},
  }))
