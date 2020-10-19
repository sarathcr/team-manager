import { TranslateModule } from '@ngx-translate/core'
import { ExerciseSidebarComponent } from './exercise-sidebar.component'

import { object, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'

import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import markDown from './exercise-sidebar.stories.md'

storiesOf('Project-Editor|Exercise Sidebar', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ExerciseSidebarComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-exercise-sidebar [exercises]="exercisesStatus">
              </app-exercise-sidebar>
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
      exercisesStatus: object('States', [
        { id: 1, name: 'Ejercicio', state: 'NOTIFICATION' },
        { id: 2, name: 'Ejercicio', state: 'DEFAULT' },
        { id: 3, name: 'Ejercicio', state: 'NOTIFICATION' },
        { id: 4, name: 'Ejercicio', state: 'DEFAULT' },
        { id: 5, name: 'Ejercicio', state: 'DEFAULT' },
      ]),
    },
  }))
