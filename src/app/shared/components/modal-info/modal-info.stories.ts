import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ButtonComponent } from '../button/button.component'
import { LoaderComponent } from '../loader/loader.component'
import { ModalInfoComponent } from './modal-info.component'
import markDown from './modal-info.stories.md'

storiesOf('Shared|Modal Info', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoaderComponent, ModalInfoComponent, ButtonComponent],
      imports: [StorybookTranslateModule, TranslateModule.forRoot()],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [{ name: 'dark background', value: '#D6D6D6', default: true }],
    notes: markDown,
  })
  .add('Delete', () => ({
    template: `<div class="story_layout_style">
    <app-modal-info class="modalform"
               [variant]="'delete'"
               [appearance]="appearance"
               [modalTitle]="title"
               [overTitle]="overTitle"
               [description]="description"
               [confirmLabel]="confirmLabel"
               [theme]="theme"
               [cancelLabel]="cancelLabel"
               (decline)="decline($event)"
               (confirm)="confirm($event)"
                >
              </app-modal-info>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modalform {
        width: 500px;
        max-width: 100%;
        background: #FFFFFF;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
      }`,
    ],
    props: {
      theme: select('Theme', ['primary', 'secondary'], 'secondary'),
      appearance: select('Appearance', ['default', 'medium'], 'default'),
      title: text('Title', 'Modal Info Title'),
      overTitle: text('Title Over', 'Modal Info Title Over'),
      description: text(
        'Description',
        'Si lo eliminas se eliminará de todas las actividades a las lo hayas asociado.'
      ),
      confirmLabel: text('Confirm Button Label', 'Confirm'),
      cancelLabel: text('Cancel Button Label', 'Cancel'),
      decline: action('You are closed the modal info'),
      confirm: action('You are clicked on the confirm button of modal info'),
    },
  }))
  .add('Confirmation', () => ({
    template: `<div class="story_layout_style">
    <app-modal-info class="modalform"
               [variant]="'confirmation'"
               [appearance]="appearance"
               [modalTitle]="title"
               [overTitle]="overTitle"
               [description]="description"
               [confirmLabel]="confirmLabel"
               [theme]="theme"
               [cancelLabel]="cancelLabel"
               (decline)="decline($event)"
               (confirm)="confirm($event)"
                >
              </app-modal-info>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modalform {
        width: 500px;
        max-width: 100%;
        background: #FFFFFF;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
      }`,
    ],
    props: {
      theme: select('Theme', ['primary', 'secondary'], 'primary'),
      appearance: select('Appearance', ['default', 'medium'], 'medium'),
      title: text('Title', 'Modal Info Title'),
      overTitle: text('Title Over', 'Modal Info Title Over'),
      description: text(
        'Description',
        'Te hemos reenviado un e-mail a [e-mail] para que puedas activar tu cuenta. Si la dirección de e-mail no es correcta debes volver a unirte.'
      ),
      confirmLabel: text('Confirm Button Label', 'Confirm'),
      cancelLabel: text('Cancel Button Label', 'Cancel'),
      decline: action('You are closed the modal info'),
      confirm: action('You are clicked on the confirm button of modal info'),
    },
  }))
  .add('Information', () => ({
    template: `<div class="story_layout_style">
    <app-modal-info class="modalform"
               [variant]="'Yet Not Implemented'"
               [appearance]="appearance"
               [modalTitle]="title"
               [overTitle]="overTitle"
               [description]="'Yet Not Implemented'"
               [confirmLabel]="confirmLabel"
               [theme]="theme"
               [cancelLabel]="cancelLabel"
               (decline)="decline($event)"
               (confirm)="confirm($event)"
                >
              </app-modal-info>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modalform {
        width: 500px;
        max-width: 100%;
        background: #FFFFFF;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
      }`,
    ],
    props: {
      // Yet not implemented
    },
  }))
  .add('Unlock', () => ({
    template: `<div class="story_layout_style">
    <app-modal-info class="modalform"
               [variant]="'unlock'"
               [appearance]="appearance"
               [modalTitle]="title"
               [overTitle]="overTitle"
               [description]="description"
               [confirmLabel]="confirmLabel"
               [theme]="theme"
               [cancelLabel]="cancelLabel"
               (decline)="decline($event)"
               (confirm)="confirm($event)"
                >
              </app-modal-info>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.modalform {
        width: 500px;
        max-width: 100%;
        background: #FFFFFF;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0.3rem;
      }`,
    ],
    props: {
      theme: select('Theme', ['primary', 'secondary'], 'primary'),
      appearance: select('Appearance', ['default', 'medium'], 'default'),
      title: text('Title', 'Modal Info Title'),
      overTitle: text('Title Over', 'Modal Info Title Over'),
      description: text(
        'Description',
        'Para seleccionar los contenidos, primero tienes que tienes que especificar los criterios de evaluación de esta asignatura en el paso Objetivos de aprendizaje.'
      ),
      confirmLabel: text('Confirm Button Label', 'Confirm'),
      cancelLabel: text('Cancel Button Label', 'Cancel'),
      decline: action('You are closed the modal info'),
      confirm: action('You are clicked on the confirm button of modal info'),
    },
  }))
