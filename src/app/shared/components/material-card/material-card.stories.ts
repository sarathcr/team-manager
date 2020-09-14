import { TranslateModule } from '@ngx-translate/core'

import {
  boolean,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { SwitchComponent } from 'src/app/shared/components/switch/switch.component'
import { StorybookTranslateModule } from 'src/app/shared/utility/storybook-translate.module'
import { MaterialCardComponent } from './material-card.component'
import markDown from './material-card.stories.md'
storiesOf('Shared|Material Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [MaterialCardComponent, SwitchComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-material-card 
    [link]="link" 
    [validPreviewLink]="validPreviewLink"
    [thumbnail]="thumbnail" 
    [label]="label" 
    [title]="title" 
    [variant]="variant" 
    [size]="size" 
    [showSwitch]="showSwitch" 
    [switchOn]="switchOn" 
    [canDelete]="canDelete" 
    [draggable]="draggable">
    </app-material-card>
   <div>`,
    styles: [
      `.story_layout_style {
              margin-top:100px;
              margin-bottom:100px;
              margin-left:100px;
              margin-right:100px;   
        }`,
    ],
    props: {
      link: text('link', 'https://youtu.be/hGIW2fDb0jg'),
      validPreviewLink: boolean('falied to find page?', true),
      thumbnail: text(
        'thumbnail',
        'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg'
      ),
      label: text('label', 'Video'),
      title: text(
        'Title',
        '¿Cuánto sabes de la historia, el arte y la cultura de la Edad Media?'
      ),
      variant: select(
        'Variant',
        ['VIDEO', 'IMAGE', 'FORM', 'EVALUATION', 'PREVIEW', 'WEB'],
        'IMAGE'
      ),
      size: select('Size', ['medium', 'small'], 'medium'),
      showSwitch: boolean('Show Switch', true),
      switchOn: boolean('Switch is On by default?', true),
      canDelete: boolean('Delete X is shown?', true),
      draggable: boolean('Draggable icon is shown?', true),
    },
  }))
