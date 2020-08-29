import { TranslateModule } from '@ngx-translate/core'
import { boolean, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { DropdownConfigInit } from '../../constants/data/form-elements.data'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { DropdownComponent } from './dropdown.component'
import markDown from './dropdown.stories.md'

const dropDownConfig = new DropdownConfigInit('country')
const gradesDropdown = new DropdownConfigInit('grades', 'multiselect')

storiesOf('Shared|Dropdown', module)
  .addDecorator(
    moduleMetadata({
      declarations: [DropdownComponent],
      imports: [
        StorybookTranslateModule,
        TranslateModule.forRoot(),
        NgMultiSelectDropDownModule,
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],
    notes: markDown,
  })
  // Story for dropdown without any items
  .add('Empty', () => ({
    template: `<div class="story_layout_style">
    <app-dropdown class="dropdown"
              [config]="countryDropdown"
              [placeholder]="placeholder"
              [label]="label"
              [canDeselect]="canDeselect"
              [getInitialData]="getInitialData"
              (dropdownSelect)="dropdownSelect($event)">

    </app-dropdown>
              </div>`,
    styles: [
      `.story_layout_style {
                  margin-top:100px;
                  margin-bottom:100px;
                  display:flex;
                  justify-content:center;
                  align-items: center;
                }`,
      `.dropdown {
                  width: 500px;
                  max-width: 100%;
                }`,
    ],
    props: {
      countryDropdown: {
        ...dropDownConfig,
        data: [],
        disabled: false,
      },
      placeholder: text('Placeholder', 'Placeholder'),
      label: text('Label', 'Label'),
      canDeselect: boolean('Can Deselect', true),
      getInitialData: boolean('Get Initial Data'),
      dropdownSelect: (event) => {
        console.log('The selected item is ', event)
      },
    },
  }))
  // Story for dropdown with single selection of item
  .add('Single-Select', () => ({
    template: `<div class="story_layout_style">
    <app-dropdown class="dropdown"
              [config]="countryDropdown"
              [placeholder]="placeholder"
              [label]="label"
              [canDeselect]="canDeselect"
              [getInitialData]="getInitialData"
              (dropdownSelect)="dropdownSelect($event)">

    </app-dropdown>
              </div>`,
    styles: [
      `.story_layout_style {
                  margin-top:100px;
                  margin-bottom:100px;
                  display:flex;
                  justify-content:center;
                  align-items: center;
                }`,
      `.dropdown {
                  width: 500px;
                  max-width: 100%;
                }`,
    ],
    props: {
      countryDropdown: {
        ...dropDownConfig,
        data: ['India', 'Unites States', 'Spain'],
        disabled: false,
      },
      placeholder: text('Placeholder', 'Placeholder'),
      label: text('Label', 'Label'),
      canDeselect: boolean('Can Deselect', true),
      getInitialData: boolean('Get Initial Data'),
      dropdownSelect: (event) => {
        console.log('The selected item is ', event)
      },
    },
  }))
  // Story for dropdown with selection of multiple items
  .add('Multi-Select', () => ({
    template: `<div class="story_layout_style">
    <app-dropdown class="dropdown"
              [config]="countryDropdown"
              [placeholder]="placeholder"
              [label]="label"
              [canDeselect]="canDeselect"
              [getInitialData]="getInitialData"
              (dropdownSelect)="dropdownSelect($event)">

    </app-dropdown>
              </div>`,
    styles: [
      `.story_layout_style {
                  margin-top:100px;
                  margin-bottom:100px;
                  display:flex;
                  justify-content:center;
                  align-items: center;
                }`,
      `.dropdown {
                  width: 500px;
                  max-width: 100%;
                }`,
    ],
    props: {
      countryDropdown: {
        ...gradesDropdown,
        data: ['India', 'Unites States', 'Spain'],
        disabled: false,
      },
      label: text('Label', 'Label'),
      placeholder: text('Placeholder', 'Placeholder'),
      canDeselect: boolean('Can Deselect', false),
      getInitialData: boolean('Get Initial Data'),
      dropdownSelect: (event) => {
        console.log('The selected item is ', event)
      },
    },
  }))
  // Story for dropdown with selection of multiple items with title
  .add('Subject-Value', () => ({
    template: `<div class="story_layout_style">
  <app-dropdown class="dropdown"
            [config]="countryDropdown"
            [placeholder]="placeholder"
            [label]="label"
            [canDeselect]="canDeselect"
            (dropdownSelect)="dropdownSelect($event)">
  </app-dropdown>
            </div>`,
    styles: [
      `.story_layout_style {
                margin-top:100px;
                margin-bottom:100px;
                display:flex;
                justify-content:center;
                align-items: center;
              }`,
      `.dropdown {
                width: 500px;
                max-width: 100%;
              }`,
    ],
    props: {
      countryDropdown: {
        priorityData: [{ id: 1, name: '1o de Primaria' }],
        data: [
          { id: 2, name: '2o de Primaria' },
          { id: 3, name: '3o de Primaria superior' },
          { id: 4, name: '4o de Primaria' },
          { id: 5, name: '5o de Primaria' },
        ],
        id: '',
        name: '',
        status: 'INPROCESS',
        selectedItems: [{ id: 1, name: '1o de Primaria superior' }],
        settings: {
          ...gradesDropdown.settings,
          textField: 'name',
          singleSelection: true,
          priorityList: true,
          priorityTitle: 'Priority Title',
          normalTitle: 'Normal Title',
          allowRemoteDataSearch: false,
          maxHeight: 225,
        },
        disabled: false,
      },
      placeholder: text('Placeholder', 'Placeholder'),
      label: text('Label', 'Label'),
      canDeselect: boolean('Can Deselect', false),
      dropdownSelect: (event) => {
        console.log('The selected item is ', event)
      },
    },
  }))
