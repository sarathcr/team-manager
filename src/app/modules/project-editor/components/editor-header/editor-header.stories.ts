import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal-form.component'
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { ValidatorComponent } from 'src/app/shared/components/validator/validator.component'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { TranslateOptions } from '../../../../shared/pipe/translate-cut.pipe'
import { ProjectTitleComponent } from '../project-title/project-title.component'
import { EditorHeaderComponent } from './editor-header.component'
import markDown from './editor-header.stories.md'

storiesOf('Shared|Editor Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        EditorHeaderComponent,
        ButtonComponent,
        LoaderComponent,
        ProjectTitleComponent,
        ModalInfoComponent,
        ModalFormComponent,
        InputComponent,
        TextareaComponent,
        ValidatorComponent,
        TranslateOptions
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
      },
      titleSubmit: action('Project Title Updated'),
    },
  }))
