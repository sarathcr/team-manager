import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ButtonComponent } from '../button/button.component'
import { LoaderComponent } from '../loader/loader.component'
import { ModalLayoutComponent } from './modal-layout.component'
import markDown from './modal-layout.stories.md'

storiesOf('Common-shared|Modal Layout', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoaderComponent, ModalLayoutComponent, ButtonComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#D6D6D6', default: true }],
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
      <app-modal-layout class="modallayout"
        [title]="title"
        [buttonSize]="buttonSize"
        [confirmLabel]="confirmLabel"
        (decline)="declineModal($event)"
        (confirm)="confirmModal($event)"
        
      >Some Content goes here</app-modal-layout>
    </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modallayout {
        width: 677px;
        max-width: 100%;
        background: #FFFFFF;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
        padding:20px;
      }`,
    ],
    props: {
      title: text('Title', 'Modal Info Title'),
      buttonSize: select(
        'Button size',
        ['default', 'small', 'medium'],
        'default'
      ),
      confirmLabel: text('Confirm Button Label', 'Confirm'),
      decline: action('You are closed the modal info'),
      confirmModal: action(
        'You are clicked on the confirm button of modal info'
      ),
    },
  }))
