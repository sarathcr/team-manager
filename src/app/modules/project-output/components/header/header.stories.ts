import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import {
  boolean,
  number,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { StorybookTranslateModule } from '../../../../shared/utility/storybook-translate.module'
import { HeaderComponent } from './header.component'
import markDown from './header.stories.md'
storiesOf('Project-Output|Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [HeaderComponent, LoaderComponent, ButtonComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-header class="header"
                [filename]="filename"
                [currentPage]="currentPage"
                [totalPages]="totalPages"
                [zoomAmt]="zoomAmt"
                [zoomMax]="zoomMax"
                [zoomMin]="zoomMin"
                [loading]="loading"
                [downloadButtonLabel]="downloadButtonLabel"
                [printButtonLabel]="printButtonLabel"
                (setZoom)="setZoom($event)"
                (download)="download($event)"
                (print)="print($event)">
              </app-header>
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
      filename: text('File Name', 'Project name.pdf'),
      downloadButtonLabel: text('Download Label', 'Download'),
      printButtonLabel: text('Print Label', 'Print'),
      zoomAmt: number('Zoom Amount'),
      zoomMax: number('Maximun Zoom'),
      zoomMin: number('Minimum Zoom'),
      setZoom: action('You are cliked on the zoom option'),
      loading: boolean('Is Loading'),
      currentPage: number('Current Page', 10),
      totalPages: number('Total Pages', 20),
      download: action('You are cliked on the download button'),
      print: action('You are cliked on the print button'),
    },
  }))
