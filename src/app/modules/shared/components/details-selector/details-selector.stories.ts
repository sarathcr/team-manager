import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { TranslateOptions } from 'src/app/common-shared/pipe/translate-cut.pipe'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { DetailsSelectorComponent } from './details-selector.component'
import markDown from './details-selector.stories.md'

storiesOf('Shared|Details Selector', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        HttpClientModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        ButtonComponent,
        DetailsSelectorComponent,
        LoaderComponent,
        TranslateOptions,
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],
    notes: markDown,
  })
  .add('With Data', () => ({
    template: `<div class="story_layout_style">
    <app-details-selector class="details_selector"
                          [variant]="variant"
                          [subjectItem]="subjectItem"
                          [subject]="subject"
                          [selectedLabel]="selectedLabel"
                          [simpleSelector]="simpleSelector"
                          [unselectedLabel]="unselectedLabel"
                          [loading]="loading"
                          [label]="label"
                          [buttonLabel]="buttonLabel">
    </app-details-selector>
    </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.details_selector {
        height: 100px;
        width: 700px;
        max-width: 100%;
       }`,
    ],
    props: {
      variant: select('Variant', ['add', 'locked'], 'add'),
      subject: {
        name: text('Subject Name', 'Subject Name'),
      },
      label: text('label', 'simpleselctorlabel'),
      buttonLabel: text('Button Label', 'Button Label'),
      subjectItem: object('Subject Item', [
        {
          name:
            'Acceder a servicios de intercambio y publicación de información digital con criterios de seguridad y uso responsable.',
          dimensions: [
            { name: 'Digital' },
            { name: 'Aprender a aprender' },
            { name: 'Comunicación lingüística' },
          ],
        },
        {
          name: 'Elaborar sencillos programas informáticos.',
          dimensions: [{ name: 'Digital' }],
        },
      ]),
      selectedLabel: text('Selected Label', 'Selected Label'),
      unselectedLabel: text('Unselected Label', 'Unselected Label'),
      loading: boolean('Is Loading', false),
      simpleSelector: boolean('Is simpleSelector', false),
    },
  }))

  .add('WithOut Data', () => ({
    template: `<div class="story_layout_style">
    <app-details-selector class="details_selector"
                          [variant]="variant"
                          [subject]="subject"
                          [subjectItem]="subjectItem"
                          [selectedLabel]="selectedLabel"
                          [simpleSelector]="simpleSelector"
                          [unselectedLabel]="unselectedLabel"
                          [loading]="loading"
                          [label]="label"
                          [buttonLabel]="buttonLabel">
    </app-details-selector>
    </div>`,
    styles: [
      `.story_layout_style {
          margin-top:100px;
          margin-bottom:100px;
          display:flex;
          justify-content:center;
          align-items: center;
      }`,
      `.details_selector {
          height: 100px;
          width: 700px;
          max-width: 100%;
       }`,
    ],
    props: {
      variant: select('Variant', ['add', 'locked'], 'add'),
      subject: {
        name: text('Subject Name', 'Subject Name'),
      },
      label: text('label', 'simpleselctorlabel'),
      buttonLabel: text('Button Label', 'Button Label'),
      subjectItem: object('Subject Item', []),
      selectedLabel: text('Selected Label', 'Selected Label'),
      unselectedLabel: text('Unselected Label', 'Unselected Label'),
      loading: boolean('Is Loading', false),
      simpleSelector: boolean('Is simpleSelector', false),
    },
  }))
