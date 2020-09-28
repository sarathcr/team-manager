import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { boolean, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { environment } from 'src/environments/environment'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { DropdownComponent } from '../dropdown/dropdown.component'
import { LoaderComponent } from '../loader/loader.component'
import markDown from '../main-header/main-header.stories.md'
import { MainHeaderComponent } from './main-header.component'

storiesOf('Shared|Private Home Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ButtonComponent,
        MainHeaderComponent,
        LoaderComponent,
        DropdownComponent,
      ],
      imports: [
        StorybookTranslateModule,
        HttpClientModule,
        SocialLoginModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        BsDropdownModule.forRoot(),
        RouterModule.forRoot([], { useHash: true }),
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  environment.googleId,
                  environment.googleLoginOptions
                ),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#F4F4F4', default: true }],

    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-main-header class="header"
      [imgUrl]="imgUrl"
      [buttonText]="buttonText"
      [back]="back"
      [title]="title"
      >
    </app-main-header>
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
      imgUrl: text(
        'imgUrl',
        'https://images.pexels.com/photos/3469600/pexels-photo-3469600.jpeg'
      ),
      buttonText: text('buttonText', 'Button Text'),
      title: text('title', 'Nombre del espacio de trabajo'),
      back: boolean('Is back header', false),
      disabled: boolean('disabled', false),
    },
  }))
