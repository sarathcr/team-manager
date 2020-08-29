import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { object, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { StepMenuComponent } from '../../../project-editor/components/step-menu/step-menu.component'
import { SidebarComponent } from './sidebar.component'
import markDown from './sidebar.stories.md'

storiesOf('Project Output|Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        NgScrollbarModule,
        RouterTestingModule,
        StorybookTranslateModule,
        TranslateModule.forRoot(),
      ],
      declarations: [StepMenuComponent, SidebarComponent],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">    
          <app-sidebar [outline]="outline"
                       [title]="title"
                       (navigateTo)="navigateTo($event)">
          </app-sidebar> 
          <div class="content"></div>
   </div>`,
    styles: [
      `.story_layout_style {
           display: flex;
           margin-top:100px;
      }`,
      `.content{
            height: calc(100vh - 75px);
            width: 100%;
            max-width: calc(100% - 235px);
            background-color: #F8F8F9;
            
       }`,
    ],
    props: {
      outline: object('Subject Item', [
        { title: 'Portada' },
        { title: 'Visión general' },
      ]),
      title: text('Text', 'Programación didáctica'),
      navigateTo: () => {
        console.log('You have clicked on the label')
      },
    },
  }))
