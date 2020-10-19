import { TranslateModule } from '@ngx-translate/core'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { object, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { DropdownComponent } from 'src/app/common-shared/components/dropdown/dropdown.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { DraggableRowComponent } from './draggable-row.component'
import markDown from './draggable-row.stories.md'

storiesOf('shared|Draggable Row', module)
  .addDecorator(
    moduleMetadata({
      declarations: [DraggableRowComponent, DropdownComponent],
      imports: [
        StorybookTranslateModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
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
    <app-draggable-row
      [element]="draggableRow"
      [dropdownData]="dropdownElements"
    >
    </app-draggable-row>
   <div>`,
    styles: [
      `.story_layout_style {
        margin: auto;
       margin-top:50px;
       margin-bottom:50px;
       max-width: 80%;
     }`,
    ],
    props: {
      draggableRow: object('DraggableRow', {
        id: 1,
        url: 'route',
        columnOne: {
          text: 'Nombre de la actividad',
          disabled: false,
        },
        columnTwo: {
          text: 'Tiempo',
          disabled: false,
        },
        columnThree: {
          text: 'Ejercicios',
          disabled: false,
        },
        columnFour: {
          text: 'Objetivos',
          disabled: false,
        },
        columnFive: {
          step: 2,
        },
        action: 'update',
      }),
      dropdownElements: object('DropdownElement', [
        {
          icon: 'icon-ic_edit',
          text: 'Editar',
          action: 'update',
        },
        {
          icon: 'icon-ic_duplicate',
          text: 'Duplicar',
          action: 'clone',
        },
        {
          icon: 'icon-ic_delete',
          text: 'Eliminar',
          action: 'delete',
        },
      ]),
    },
  }))
