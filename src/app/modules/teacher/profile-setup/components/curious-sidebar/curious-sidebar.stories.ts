import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { object, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { CuriousSidebarComponent } from './curious-sidebar.component'
import markDown from './curious-sidebar.stories.md'

storiesOf('Profile |Curious Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterTestingModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
        NgScrollbarModule,
      ],
      declarations: [CuriousSidebarComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
          <app-curious-sidebar
          [title]="title"
          [stepData]="dummyStepdata">
          </app-curious-sidebar>
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
      dummyStepdata: object('StepsData', [
        {
          id: 1,
          name: 'SOBRE TI',
          status: 'DONE',
          currentStep: false,
          assetUrl: './assets/images/about-you@2x.png',
        },
        {
          id: 2,
          name: 'SOBRE TU CENTRO EDUCATIVO',
          status: 'INPROGRESS',
          currentStep: true,
          assetUrl: './assets/images/about-you@2x.png',
        },
        {
          id: 1,
          name: 'CREA TU ESPACIO DE TRABAJO',
          status: 'PENDING',
          currentStep: false,
          assetUrl: './assets/images/about-you@2x.png',
        },
      ]),
      title: text('Title', 'Title'),
    },
  }))
