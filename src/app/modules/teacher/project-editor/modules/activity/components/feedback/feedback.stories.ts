import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { object, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { FeedbackComponent } from './feedback.component'
import markDown from './feedback.stories.md'

storiesOf('Project-Editor|Feedback', module)
  .addDecorator(
    moduleMetadata({
      declarations: [FeedbackComponent],
      imports: [BrowserAnimationsModule, CommonSharedModule],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-feedback [title]="title" [comments]="comments">
    </app-feedback>
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
      title: text('text', 'Feedback'),
      comments: object('Comments', [
        {
          imageUrl:
            'https://dev-static-site-uploads-s3bucket-qszu9j09ywh7.s3.eu-west-3.amazonaws.com/1601477718237-pexels-bernd-feurich-2497299.jpg',
          name: 'Elisabeth Manrique',
          date: '2020:12:12',
          content:
            'Newmo enim ipsam voluptatem quia voluptas sit apspermatur aut odiot aut fugit, se rudam consequintur manqgi dolores eu qui nesciut',
        },
      ]),
    },
  }))
