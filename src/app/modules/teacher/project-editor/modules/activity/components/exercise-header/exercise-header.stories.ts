import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { ExerciseHeaderComponent } from './exercise-header.component'

import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import markDown from './exercise-header.stories.md'

storiesOf('shared|Exercise Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent, ExerciseHeaderComponent, LoaderComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-exercise-header [title]="title" [buttonText]="buttonText" [delivery]="delivery" [description]="description" [qualifiying]="qualifiying" [isDelivered]="isDelivered" [isQualifying]="isQualifying" [showCalifications]="showCalifications">
              </app-exercise-header>
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
      title: text('Title', 'Ejercicio 3'),
      buttonText: text('Button Text', 'Entregar ejercicio'),
      delivery: text('Delivery', 'Entregado el 14.07.2020'),
      description: text(
        'Description',
        'Descubre paso a paso cómo se formaron las ciudades en la época medieval'
      ),
      qualifiying: text('Qualifiying', 'Calificable'),
      isDelivered: boolean('isDelivered', false),
      isQualifying: boolean('isQualifying', false),
      showCalifications: boolean('showCalifications', false),
    },
  }))
