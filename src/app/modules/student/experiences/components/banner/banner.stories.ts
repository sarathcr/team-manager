import { TranslateModule } from '@ngx-translate/core'
import { text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { BannerComponent } from './banner.component'
import markDown from './banner.stories.md'
storiesOf('shared|Banner', module)
  .addDecorator(
    moduleMetadata({
      declarations: [BannerComponent, ButtonComponent, LoaderComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-banner 
      [imgUrl]="imgUrl"
      [heading]="heading">
    </app-banner>
   <div>`,
    styles: [
      `.story_layout_style {
        margin: auto;
        margin-top:50px;
        margin-bottom:50px;
     }`,
    ],
    props: {
      imgUrl: text('imgUrl', ''),

      heading: text(
        'Heading',
        'Lorem ipsim et cursus sit amet semper consecten adipiscing est elit'
      ),
    },
  }))
