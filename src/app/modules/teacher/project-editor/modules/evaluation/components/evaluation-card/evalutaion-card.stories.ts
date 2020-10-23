import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { EvaluationCardComponent } from './evaluation-card.component'

import {
  boolean,
  number,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'

import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { CommonSharedModule } from '../../../../../../../common-shared/common-shared.module'
import markDown from './evaluation-card.stories.md'

storiesOf('Evalutaion|Evaluation Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EvaluationCardComponent],
      imports: [
        BrowserAnimationsModule,
        CommonSharedModule,
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-evaluation-card [title]="title" [percentage]="percentage" [infoPercentage]="infoPercentage" [isExercise]="isExercise" [isNotClasificable]="isNotClasificable" [hasHeader]="hasHeader">
              </app-evaluation-card>
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
      title: text('Title', 'Calificación global'),
      percentage: number('Percentage', 100),
      infoPercentage: text(
        'Pannel iformation',
        'La suma de porcentajes debe ser 100.'
      ),
      isExercise: boolean('Is an Exercise Card?', false),
      isNotClasificable: boolean('Is not clasificable?', false),
      hasHeader: boolean('Has header?', false),
    },
  }))
