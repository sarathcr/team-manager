import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { EvaluationSidebarComponent } from './evaluation-sidebar.component'
import markDown from './evaluation-sidebar.stories.md'

storiesOf('Evaluation|Evaluation-sidebar', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EvaluationSidebarComponent],
      imports: [BrowserAnimationsModule, CommonSharedModule],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-evaluation-sidebar  [title]="title" [label]="label" [icon]="icon">
      
    </app-evaluation-sidebar>
   <div>`,
    styles: [
      `.story_layout_style {
       width: 100%;
       height: 500px;
       background-color: #cccccc;
     }`,
    ],
    props: {
      title: text('text', 'Alumnos (0)'),
      label: text('label', 'Alumno'),
      icon: select('Select icon', ['user', 'add'], 'user'),
    },
  }))
