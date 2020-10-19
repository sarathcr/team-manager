import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { CheckCount } from '../../pipes/check-count.pipe'
import { CustomCheckBoxComponent } from '../custom-checkbox/custom-checkbox.component'
import { SecondaryViewComponent } from './secondary-view.component'
import markDown from './secondary-view.stories.md'

storiesOf('Project Editor|Secondary view', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        SecondaryViewComponent,
        ButtonComponent,
        CheckCount,
        CustomCheckBoxComponent,
        LoaderComponent,
      ],
      imports: [
        NgScrollbarModule,
        StorybookTranslateModule,
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
    <app-secondary-view class="secondary_view"
    [blockData]="serviceData"
    [heading]="heading"
    [modalColumns]="modalcolumns"
    [translateData]="translatedata"
    [labels]="labels"
    (getPrimary)="getPrimary($event)">
    </app-secondary-view>
   </div>`,

    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.secondary_view{
     width: 900px;
     max-width:100%;
   }
 `,
    ],
    props: {
      serviceData: [
        {
          blockIndex: 1,
          colOneHead: 'OBJECTIVES.project_objectives_criteriawindow_criterion',
          contents: [
            {
              code: '18',
              description:
                'Phasellus ac rhoncus ex. Proin tellus tortor, tristique in maximus quis, volutpat at ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
              id: 18,
              name:
                'Phasellus ac rhoncus ex. Proin tellus tortor, tristique in maximus quis, volutpat at ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
              numeration: 18,
            },
            {
              code: '19',
              description: 'Proin iaculis ultricies fringilla',
              id: 19,
              name: 'Proin iaculis ultricies fringilla',
              numeration: 19,
            },
          ],
          description: 'Tecnologías de la información y de la comunicación',
          evaluationCriteria: [
            {
              checked: true,
              code: '223',
              colFourData: 'Tecnologías de la información y de la comunicación',
              colOneData:
                'Analizar los elementos y sistemas que configuran la comunicación alámbrica e inalámbrica.',
              colThreeData: '1o de Primaria',
              colTwoData: '',
            },
            {
              checked: true,
              code: '223',
              colFourData: 'Tecnologías de la información y de la comunicación',
              colOneData:
                'Acceder a servicios de intercambio y publicación de información digital con criterios de seguridad y uso responsable. ',
              colThreeData: '1o de Primaria',
              colTwoData: '',
            },
            {
              checked: true,
              code: '223',
              colFourData: 'Instalaciones en viviendas',
              colOneData:
                ' Analizar los elementos y sistemas que configuran la comunicación alámbrica e inalámbrica.',
              colThreeData: '1o de Primaria',
              colTwoData: '',
            },
          ],
          gradeId: 1,
          id: 177,
          name: 'Duis porta risus',
          numeration: 177,
          subjectId: 2,
          virtual: false,
        },
      ],
      heading: {
        evaluationCriteria: 'Criterio de evaluación',
        basicSkills: 'basicskill',
        course: 'Curso',
        block: 'Bloque',
        dimension: 'dimenstion',
        checked: 'true',
        standard: 'standard',
        subject: 'subject',
      },
      modalcolumns: {
        colFourHead: {
          key: 'block',
          value: 'OBJECTIVES.project_objectives_criteriawindow_block',
        },
        colOneHead: {
          key: 'evaluationCriteria',
          value: 'OBJECTIVES.project_objectives_criteriawindow_criterion',
        },
        colThreeHead: {
          key: 'course',
          value: 'OBJECTIVES.project_objectives_criteriawindow_grade',
        },
      },
      translatedata: {
        principlemodalcolhead: { key: '', value: '', size: 'sm' },
        subjectTitle: 'subjecttitle',
        summaryTitle: 'summary',
        bodyTitle: 'bodytitle',
        countText: 'counttext',
        addButton: 'addbutton',
        selectedItem: 'selecteditem',
        emptyTitle: 'emptytitle',
        emptyDescription: 'description',
        emptyButton: 'emptybutton',
      },
      labels: {
        selectedItemText: 'criterios seleccionados',
        emptyTitle: 'No tienes criterios seleccionados',
        emptyDescription:
          'Selecciona criterios de evaluación del currículum y visualiza el listado de seleccionados aquí para añadirlos.',
        emptyButtonText: 'VER CRITERIOS',
      },
      getPrimary: action('button clicked'),
    },
  }))
