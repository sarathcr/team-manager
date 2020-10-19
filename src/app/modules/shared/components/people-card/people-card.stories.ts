import { TranslateModule } from '@ngx-translate/core'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from 'src/app/common-shared/utility/storybook-translate.module'
import { PeopleCardComponent } from './people-card.component'
import markDown from './people-card.stories.md'

storiesOf('Shared|People Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PeopleCardComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
      <app-people-card 
        [profileName]="profileName"
        [profileType]="profileType"
        [inviteLabel]="inviteLabel"
        [imageUrl]="imageURL"
        [variant]="variant"
        
      ></app-people-card>
    </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
    ],

    props: {
      profileName: text('Title', 'Profile name'),
      profileType: text('Type', 'Profile Type'),
      imageUrl: text(
        'imageUrl',
        'https://images.pexels.com/photos/2422560/pexels-photo-2422560.jpeg'
      ),
      inviteLabel: text('Title', 'Invite text'),
      variant: select('Variant', ['default', 'invite'], 'default'),
    },
  }))
