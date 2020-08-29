import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { object, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { StepMenuComponent } from '../step-menu/step-menu.component'
import { SidebarComponent } from './sidebar.component'
import markDown from './sidebar.stories.md'

storiesOf('Project Editor|Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterTestingModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
      declarations: [StepMenuComponent, SidebarComponent],
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
                      [title]="title"
                      [steps]="steps">
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
      title: text('Title', 'Title'),
      steps: object('Steps', [
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
