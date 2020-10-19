import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { InputComponent } from 'src/app/common-shared/components/input/input.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { ModalFormComponent } from 'src/app/common-shared/components/modal-form/modal-form.component'
import { ModalInfoComponent } from 'src/app/common-shared/components/modal-info/modal-info.component'
import { TextareaComponent } from 'src/app/common-shared/components/textarea/textarea.component'
import { ValidatorComponent } from 'src/app/common-shared/components/validator/validator.component'
import { TranslateOptions } from 'src/app/common-shared/pipe/translate-cut.pipe'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { EditorHeaderComponent } from './editor-header.component'
import markDown from './editor-header.stories.md'

storiesOf('Shared|Editor Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        EditorHeaderComponent,
        ButtonComponent,
        LoaderComponent,
        ModalInfoComponent,
        ModalFormComponent,
        InputComponent,
        TextareaComponent,
        ValidatorComponent,
        TranslateOptions,
      ],
      imports: [
        ReactiveFormsModule,
        ModalModule.forRoot(),
        StorybookTranslateModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [BsModalService],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],

    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-editor-header class="header"
                [projectData]="projectData"
                [stepOneStatus]="stepOneStatus"
                [labels]="labels"
                (titleSubmit)="titleSubmit($event)">
    </app-editor-header>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.header {
        max-width: 100%;
       }`,
    ],
    props: {
      stepOneStatus: select(
        'Button Theme',
        ['INPROCESS', 'DONE', 'PENDING'],
        'INPROCESS'
      ),
      projectData: { title: text('Project Title', 'Project Title') },
      labels: {
        buttonLabel: text('Button Label', 'Programación'),
        structure: text('Structure', 'Estructura'),
        activities: text('Activities', 'Actividades'),
        evaluation: text('Evaluation', 'Evaluación'),
        calendar: text('Calendar', 'Calendar'),
        people: text('People', 'People'),
      },
      titleSubmit: action('Project Title Updated'),
    },
  }))
