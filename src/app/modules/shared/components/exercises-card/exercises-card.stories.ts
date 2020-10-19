import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { SwitchComponent } from 'src/app/common-shared/components/switch/switch.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { MaterialCardComponent } from '../material-card/material-card.component'
import { ExercisesCardComponent } from './exercises-card.component'
import markDown from './exercises-card.stories.md'
storiesOf('Shared|Excercises Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ExercisesCardComponent,
        MaterialCardComponent,
        SwitchComponent,
      ],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#D6D6D6', default: true }],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div  class="story_layout_style">
      <app-exercises-card  
        [title]="title" 
        [subtitle]="subtitle" 
        [subtitleKey]="subtitleKey" 
        [subtitleValue]="subtitleValue" 
        [description]="description"
        (options)="options($event)">
      </app-exercises-card>
   <div>`,
    styles: [
      `.story_layout_style {
                margin-top:100px;
                margin-bottom:100px;
                display:flex;
                justify-content:center;
                align-items: center;    
              }`,
    ],
    props: {
      title: text('title', '¿Cuánto sabes de la Edad Media?'),
      subtitle: text('subtitle', 'Calificable'),
      subtitleKey: text('subtitleKey', 'Entrega online:'),
      subtitleValue: text('subtitleValue', 'fecha pendiente'),
      description: text(
        'description',
        'Una vez visto el documental sobre la Edad media y habiendo realizado elpaseo virtual, contesta al siguiente formulario:'
      ),
      options: action('You can select any options'),
    },
  }))
