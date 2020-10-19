import { TranslateModule } from '@ngx-translate/core'

import { RouterTestingModule } from '@angular/router/testing'
import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { MinutesToHours } from '../../pipes/minutes-to-hours.pipe'
import { StatisticsBoxComponent } from './statistics-box.component'
import markDown from './statistics-box.stories.md'

storiesOf('shared|Statistics Box', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StatisticsBoxComponent, MinutesToHours],
      imports: [
        StorybookTranslateModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('chart mode', () => ({
    template: `<div class="story_layout_style">
    <app-statistics-box
      [variant]="variant"
      [data]="box"
    >
    </app-statistics-box>
   <div>`,
    styles: [
      `.story_layout_style {
        margin-left: 300px;
        margin-top: 50px;
        height: 256px;
        width: 439px;
        background-color: grey;
     }`,
    ],
    props: {
      variant: select(
        'Variant',
        ['-- select any variant --', 'resume', 'chart'],
        'resume'
      ),
      box: {
        supertitle: text('box.supertitle', 'has creado'),
        icon: text('box.icon', 'duration'),
        title: text('box.title', '8 actividades'),
        phases: [
          {
            text: 'Fase inicial',
            total: 2,
          },
          {
            text: 'Fase de desarrollo',
            total: 0,
          },
          {
            text: 'Fase de síntesis',
            total: 4,
          },
        ],
        infoText: text('box.infoText', 'Duración total del proyecto'),
        actionValue: text('box.actionValue', '100'),
        actionValueUnit: text('box.actionValueUnit', 'h'),
        chartText: text('box.chartText', '3:34h'),
        charDoubleValue: {
          current: text('box.charDoubleValue.current', '1'),
          total: text('box.charDoubleValue.total', '4'),
        },
        progress: text('box.progress', '50'),
        hasValue: boolean('box.hasValue', false),
      },
    },
  }))
