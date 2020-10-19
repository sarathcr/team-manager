import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { boolean, select, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ModalModule } from 'ngx-bootstrap/modal'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { CustomCheckBoxComponent } from './custom-checkbox.component'
import markDown from './custom-checkbox.stories.md'

storiesOf('Project-Editor|Custom Checkbox', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CustomCheckBoxComponent],
      imports: [
        StorybookTranslateModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  // Default checkbox
  .add('Default', () => ({
    template: ` <div class="story_layout_style">
      <app-custom-checkbox class="checkbox"
      [isHead] ="isHead"
      [checkboxData]="checkboxData"
      [parentID]="parentID"
      [colOne]="checkboxcoloumnone"
      [changeBg]="changeBg"
      [clickableLabel]="clickableLabel"
      (checked)="checked($event)">
      </app-custom-checkbox>
     </div>`,

    styles: [
      `.story_layout_style {
          display:flex;
          justify-content:center;
          align-items: center;
        }`,
      `.checkbox{
       width: 900px;
       max-width:100%;
     }
   `,
    ],
    props: {
      isHead: boolean('Is Head', false),
      changeBg: boolean('Change backgrouond', false),
      clickableLabel: boolean('Clickable Label', true),
      checkboxcoloumnone: {
        value: 'colOne',
      },
      checkboxData: {
        checked: true,
      },
      checked: action('Your are enter this message'),
    },
  }))
  // Default checkbox with list

  .add(' Default List', () => ({
    template: `<div *ngFor="let item of checkboxdata">
    <div class="story_layout_style">
      <app-custom-checkbox class="checkbox"
      [isHead] ="item.isHead"
      [checkboxData]="item.checkboxData"
      [parentID]="parentID"
      [colOne]="item"
      [changeBg]="item.changeBg"
      [clickableLabel]="item.clickableLabel"
      (checked)="checked($event)">
      </app-custom-checkbox>
     </div>
     </div>`,

    styles: [
      `.story_layout_style {
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.checkbox{
     width: 900px;
     max-width:100%;
   }
  `,
    ],
    props: {
      checkboxdata: [
        {
          value: 'Elaborar sencillos programas informáticos',
          checkboxData: { checked: true },
        },
        {
          value: ' 1 de Primaria',
          checkboxData: { checked: true },
        },
        {
          value: 'Tecnologías de la información y de la comunicación ',
          checkboxData: { checked: true },
        },
      ],

      checkboxcoloumnone: {
        value: 'colone',
      },
      checked: action('Your are enter this message'),
    },
  }))

  //   //checkbox with coloumns

  .add('withColoumn', () => ({
    template: ` <div class="story_layout_style">
      <app-custom-checkbox class="checkbox"
      [isHead] ="isHead"
      [checkboxData]="checkboxData"
      [parentID]="parentID"
      [colOne]="checkboxcoloumnone"
      [colTwo]="checkboxcoloumntwo"
      [colThree]="checkboxcoloumthree"
      [colFour]="checkboxcoloumnfour"
      [changeBg]="changeBg"
      [clickableLabel]="clickableLabel"
      (checked)="checked($event)">
      </app-custom-checkbox>
     </div>`,

    styles: [
      `.story_layout_style {
          display:flex;
          justify-content:center;
          align-items: center;
        }`,
      `.checkbox{
       width: 900px;
       max-width:100%;
     }
   `,
    ],
    props: {
      isHead: boolean('Is Head', false),
      changeBg: boolean('Change backgrouond', false),
      clickableLabel: boolean('Clickable Label', true),
      checkboxData: {
        checked: true,
      },
      checkboxcoloumnone: {
        value: 'colOne',
        size: select(
          'Size One',
          ['-- select any size --', 'sm', 'm', 's', 'xs'],
          'sm'
        ),
      },
      checkboxcoloumntwo: {
        value: 'colTwo',
        size: select(
          'Size Two',
          ['-- select any size --', 'sm', 'm', 's', 'xs'],
          'm'
        ),
      },
      checkboxcoloumnthree: {
        value: 'colThree',
        size: select(
          'Size Three',
          ['-- select any size --', 'sm', 'm', 's', 'xs'],
          's'
        ),
      },
      checkboxcoloumnfour: {
        value: 'colFour',
        size: select(
          'Size Four',
          ['-- select any size --', 'sm', 'm', 's', 'xs'],
          'xs'
        ),
      },

      checked: action('Your are enter this message'),
    },
  }))
