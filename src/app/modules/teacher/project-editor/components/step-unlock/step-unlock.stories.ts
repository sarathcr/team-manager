import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { ValidatorComponent } from 'src/app/common-shared/components/validator/validator.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { StepUnlockComponent } from './step-unlock.component'
import markDown from './step-unlock.stories.md'

storiesOf('Project-Editor|Step-Unlock', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        StorybookTranslateModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        ButtonComponent,
        LoaderComponent,
        StepUnlockComponent,
        ValidatorComponent,
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#EEEFEF', default: true }],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-step-unlock class="step_unlock"  
                    [title]="title"
                    [description]="description"
                    [buttonText]="buttonText">
    </app-step-unlock>
    </div>`,
    styles: [
      `.story_layout_style {
          margin-top:100px;
          margin-bottom:100px;
          display:flex;
          justify-content:center;
          align-items: center;
      }`,
      `.step_unlock {
          width: 700px;
          max-width: 100%;
       }`,
    ],
    props: {
      title: text('Title', 'Title'),
      description: text(
        'Description',
        'Para poder especificar los estándares o indicadores de aprendizaje, primero completa el paso objetivos de aprendizaje.'
      ),
      buttonText: text('Button Text', 'Button Label'),
    },
  }))
