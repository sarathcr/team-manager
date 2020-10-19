import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { boolean, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { ModalInfoComponent } from 'src/app/common-shared/components/modal-info/modal-info.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { BoxRowComponent } from './box-row.component'
import markDown from './box-row.stories.md'

storiesOf('shared |Box row', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
        StorybookTranslateModule,
      ],
      declarations: [
        BoxRowComponent,
        ModalInfoComponent,
        ButtonComponent,
        LoaderComponent,
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
          <app-box-row 
          [isHead]="isHead"
          [hasClose]="hasClose">
          {{content}}
          </app-box-row>
   </div>`,
    props: {
      isHead: boolean('isHead', false),
      hasClose: boolean('hasClose', false),
      content: text('NG Content', 'Visit Storybooks'),
    },
    styles: [
      `.story_layout_style {
          margin-top:100px;
          margin-bottom:100px;
          display:flex;
          justify-content:center;
          align-items: center;
      }`,
    ],
  }))
