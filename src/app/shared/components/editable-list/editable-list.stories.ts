import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import {
  number,
  select,
  text,
  boolean,
  object,
  withKnobs,
} from '@storybook/addon-knobs/angular'
import { moduleMetadata, storiesOf } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utility/storybook-translate.module'
import { ModalModule } from 'ngx-bootstrap/modal'
import { EditableListComponent } from './editable-list.component'
import { ModalInfoComponent } from '../modal-info/modal-info.component'
import { ModalFormComponent } from '../modal-form/modal-form.component'
import { ButtonComponent } from '../button/button.component'
import { InputComponent } from '../input/input.component'
import { TextareaComponent } from '../textarea/textarea.component'
import { ValidatorComponent } from '../validator/validator.component'
import markDown from './editable-list.stories.md'
import { ReactiveFormsModule } from '@angular/forms'
import { LoaderComponent } from '../loader/loader.component'

storiesOf('Shared|EditableList', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        EditableListComponent,
        ModalInfoComponent,
        ModalFormComponent,
        ButtonComponent,
        InputComponent,
        TextareaComponent,
        ValidatorComponent,
        LoaderComponent,
      ],
      imports: [
        StorybookTranslateModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    notes: markDown,
  })
  .add('Default', () => ({
    template: `<div class="story_layout_style">
    <app-editable-list class="editable_list"
    [list] ="list"
    [maxLength]="150"
    [variant]="variant"
    [isNumbered]="isNumbered"
    [editModalTitle]="editModalTitle"
    [editModalLabel]="editModalLabel"
    [editModalbuttonLabel]="editModalbuttonLabel"
    [deleteModalTitle]="deleteModalTitle"
    [deleteModalDescription]="deleteModalDescription"
    [deleteModalbuttonLabel]="deleteModalbuttonLabel"
    [helperText]="helperText"
    [textareaPlaceholder]="textareaPlaceholder"
    [errorText]="errorText"
    [textareaVariant]="textareaVariant"
    [lineLimit]="lineLimit"
    [optionalPlaceholder]="optionalPlaceholder"
    [optionalButtonLabel]="optionalButtonLabel"
    [optionalTitle]="optionalTitle"
    [isTextareaActive]="isTextareaActive"
    [initFocus]="initFocus"
    (textareaActive)="textareaActive($event)"
    (editItem)="editItem($event)"
    (deleteItem)="deleteItem($event)"
    (addItem)="addItem($event)">
    </app-editable-list>
   </div>`,
    styles: [
      `.story_layout_style {
        margin-top:100px;
        margin-bottom:100px;
        display:flex;
        justify-content:center;
        align-items: center;
      }`,
      `.editable_list{
     width: 500px;
     max-width:100%;
   }
 `,
    ],
    props: {
      variant: select(
        'Variant',
        ['-- select any variant --', 'default', 'optional'],
        'default'
      ),
      list: object('List', [
        { id: 1, name: 'Name one' },
        { id: 2, name: 'Name two' },
      ]),
      maxLength: number('Maximum Length', 20),
      isTextareaActive: boolean('Active Textarea', false),
      isNumbered: boolean('Is Numbered', false),
      initFocus: boolean('Initial Focus', true),
      helperText: text('Helper Text', 'Validation message here'),
      errorText: text('Error Text', 'Validation message here'),
      editModalTitle: text('Edit Modal Title', 'EDITA LA TEMATICA'),
      editModalLabel: text('Edit Modal Label', 'Tematica'),
      editModalbuttonLabel: text('EditModal button Label', 'GUARDAR'),
      deleteModalTitle: text('Delete Modal Title', 'Tematica'),
      deleteModalDescription: text(
        'Delete Modal Description',
        'si la eliminas la tendras que volver a introducier'
      ),
      deleteModalbuttonLabel: text(' Delete Modal buttonLabel', ' ELIMINAR'),
      textareaPlaceholder: text('Placeholder', 'placeholder'),
      lineLimit: number('line limit', 70),
      optionalButtonLabel: text('Optional Button Label', 'marcar como hecho'),
      optionalPlaceholder: text('Optional Placeholder', 'optional Placeholder'),
      optionalTitle: text('Optional Title ', 'optional Title'),
      textareaActive: action('Your are enter this message'),
      editItem: action('Your are enter this message'),
      deleteItem: action('Your are enter this message'),
      addItem: action('Your are enter this message'),
    },
  }))
