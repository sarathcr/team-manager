import { withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import markDown from '../typography/typography.stories.md'
storiesOf('|Typograhy', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Title', () => ({
    template: `<div class="story_layout_style">
    <h5>'title' class is used</h5>
    <p class="title">
        sample of title
    </p>
    <h5>'title_xxl' class is used</h5>
    <p class="title_xxl">
        sample of xxl
    </p>
    <h5>'title_xl' class is used</h5>
    <p class="title_xl">
        sample of xl
    </p>
    <h5>'title_l' class is used</h5>
    <p class="title_l">
        sample of large
    </p>
    <h5>'title_m' class is used</h5>
    <p class="title_m">
        sample of medium
    </p>
    <h5>'title_s' class is used</h5>
    <p class="title_s">
        sample of small
    </p>
    <h5>'title_xs' class is used</h5>
    <p class="title_xs">
        sample of xs
    </p>
    <h5>'title_primary' class is used</h5>
    <p class="title_primary">
        sample of primary
    </p>
    <h5>'title_secondary' class is used</h5>
    <p class="title_secondary">
        sample of secondary
    </p>
    <h5>'title_grey' class is used</h5>
    <p class="title_grey">
        sample of grey
    </p>
    <h5>'title_upper-case' class is used</h5>
    <p class="title_upper-case">
        sample of uppercase
    </p>
    <h5>'title_inline' class is used</h5>
    <p class="title_inline">
        sample of inline
    </p>
    </div>   
`,
    styles: [
      `.story_layout_style {
            margin-top:100px;
            margin-bottom:100px;
            margin-left:100px;
            justify-content:center;
            align-items: center;
          }`,
    ],
  }))
  //paragraph
  .add('Paragraph', () => ({
    template: `<div class="story_layout_style">
              <h5>'p' class is used</h5>
              <p >Escoge las áreas o asignaturas que van a estar implicadas en tu proyecto. Para ofrecerte solo las áreas que te interesan, necesitamos saber qué curso impartes y en qué territorio.</p>
              <h5>'.blockquote' class is used</h5>
              <p class="blockquote">blaxkquote</p>
              </div>    
       `,
    styles: [
      `.story_layout_style {
            margin-top:100px;
            margin-bottom:100px;
            margin-left:100px;
            justify-content:center;
            align-items: center;
          }`,
    ],
  }))
