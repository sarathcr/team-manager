import { TranslateModule } from '@ngx-translate/core'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { number, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { DropdownComponent } from 'src/app/common-shared/components/dropdown/dropdown.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { ReadMoreComponent } from './read-more.component'

import markDown from './read-more.stories.md'

storiesOf('Project-Editor| Read more', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ReadMoreComponent, DropdownComponent],
      imports: [
        StorybookTranslateModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
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
    <app-read-more [text]="text" [maxCharacters]="maxCharacters" [showText]="showMore" [hideText]="showLess">
    </app-read-more>
   <div>`,
    styles: [
      `.story_layout_style {
        margin: auto;
       margin-top:50px;
       margin-bottom:50px;
       max-width: 80%;
     }`,
    ],
    props: {
      text: text(
        'Text',
        'Vis id minim dicant sensibus. Pri aliquip conclusionemque ad, ad malis evertitur torquatos his. Has ei solum harum reprimique, id illum saperet tractatos his. Ei omnis soleat antiopam quo. Ad augue inani postulant mel, mel ea qualisque forensibus.'
      ),
      showMore: text('show more text link', 'Mostrar más'),
      showLess: text('show less text link', 'Mostrar menos'),
      maxCharacters: number('number of characters to show', 10),
    },
  }))
