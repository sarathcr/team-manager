import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { object, select, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ButtonComponent } from '../button/button.component'
import { LoaderComponent } from '../loader/loader.component'
import { DropdownComponent } from './dropdown.component'
import markDown from './dropdown.stories.md'

storiesOf('Common-shared|Dropdown', module)
  .addDecorator(
    moduleMetadata({
      declarations: [DropdownComponent, ButtonComponent, LoaderComponent],
      imports: [
        BrowserAnimationsModule,
        StorybookTranslateModule,
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
    <app-dropdown
      [list]="list"
      [position]="position"
      (actionToDo)="actionEmit($event)"
    >
    <app-button>click me</app-button>
    </app-dropdown>
   <div>`,
    styles: [
      `.content-icon {
      font-size: 26px;
      letter-spacing: 1px;
      color: $black;
    }`,
      `.story_layout_style {
      margin:30px 30px;
      justify-content:center;
      align-items: center;
    }`,
    ],
    props: {
      list: object('List', [
        {
          icon: 'icon-ic_user',
          text: 'Editar',
          action: 'update',
        },
        {
          icon: 'icon-ic_copy',
          text: 'Duplicar',
          action: 'clone',
        },
        {
          icon: 'icon-ic_delete',
          text: 'Eliminar',
          action: 'delete',
        },
      ]),
      position: select(
        'Position',
        ['-- Select the position --', 'right', 'left', 'center'],
        'right'
      ),
      actionEmit: action('clicked'),
    },
  }))
