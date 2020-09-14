import { TranslateModule } from '@ngx-translate/core'
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { DropdownSelectComponent } from './dropdown-select.component'
import markDown from './dropdown-select.stories.md'

const data = [
  {
    id: 1,
    name: 'Recently opened',
  },
  {
    id: 2,
    name: 'Name',
  },
  {
    id: 3,
    name: 'Created',
  },
]

storiesOf('Shared|Dropdown-select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [DropdownSelectComponent],
      imports: [
        StorybookTranslateModule,
        TranslateModule.forRoot(),
        NgMultiSelectDropDownModule,
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `
    <div class="story_layout_style">
      <app-dropdown-select
      [data]="data"
      [label]="label"
      [placeholder]="placeholder"
      [textField]="textField"
      [noDataAvailablePlaceholder]="noDataAvailablePlaceholder"
      [maxHeight]="maxHeight"
      [multiSelection]="multiSelection"
      [canDeselect]="canDeselect"
      [defaultSelected]="defaultSelected"
      [disabled]="disabled"
      [position]="position"
      (dropdownSelect)="dropdownSelect($event)"
      ></app-dropdown-select>
    <div>
   `,
    styles: [
      `.story_layout_style {
            margin-top:200px;
            margin-left:500px;
           }`,
    ],
    props: {
      label: text('Label', 'Order by'),
      placeholder: text('Placeholder', 'Placeholder'),
      textField: text('Text field', 'name'),
      noDataAvailablePlaceholder: text(
        'No Data Available Placeholder',
        'No data available'
      ),
      maxHeight: text('Max Height', '250'),
      multiSelection: boolean('Multislection', false),
      canDeselect: boolean('Can deselect', false),
      defaultSelected: boolean('Default selected', false),
      disabled: boolean('Disabled', false),
      data: object('Data', [
        { id: 2, name: '2o de Primaria' },
        { id: 3, name: '3o de Primaria superior' },
        { id: 4, name: '4o de Primaria' },
        { id: 5, name: '5o de Primaria' },
      ]),
      position: select('Position', ['right'], 'right'),
      dropdownSelect: (event) => {
        console.log('The selected item is ', event)
      },
    },
  }))
