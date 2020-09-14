import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { number, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'
import { ModalFormComponent } from 'src/app/shared/components/modal-form/modal-form.component'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { ValidatorComponent } from 'src/app/shared/components/validator/validator.component'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { TranslateOptions } from '../../../../shared/pipe/translate-cut.pipe'
import { ProjectTitleComponent } from './project-title.component'
import markDown from './project-title.stories.md'

storiesOf('Shared|Project Title', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        ModalModule.forRoot(),
        RouterTestingModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        ButtonComponent,
        InputComponent,
        LoaderComponent,
        ModalFormComponent,
        ProjectTitleComponent,
        TextareaComponent,
        ValidatorComponent,
        TranslateOptions
      ],
      providers: [BsModalService],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
          <app-project-title
                      [projectData]="projectData"
                      [maxLength]="maxLength"
                      (titleSubmit)="titleSubmit($event)">
          </app-project-title>
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
      projectData: { title: 'Project Title' },
      maxLength: number('Maximum Length', 70),
      titleSubmit: (event) => {
        console.log('The updated is ', event)
      },
    },
  }))
