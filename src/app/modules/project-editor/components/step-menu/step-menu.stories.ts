import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { object, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { StepMenuComponent } from './step-menu.component'
import markDown from './step-menu.stories.md'

storiesOf('Project Editor|Step Menu', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterTestingModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
      declarations: [SidebarComponent, StepMenuComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">    
              <app-sidebar 
               [steps]="step">
              </app-sidebar>  
   </div>`,
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
      step: object('Steps', [
        { stepid: 1, name: 'Punto de partida', state: 'DONE' },
        { stepid: 2, name: 'Temática', state: 'DONE' },
        { stepid: 3, name: 'Objetivos', state: 'INPROCESS' },
        { stepid: 4, name: 'Contenidos', state: 'PENDING' },
        { stepid: 5, name: 'Preguntas guía', state: 'PENDING' },
        { stepid: 6, name: 'Título creativo', state: 'PENDING' },
        { stepid: 7, name: 'Contenidos', state: 'PENDING' },
      ]),
    },
  }))
