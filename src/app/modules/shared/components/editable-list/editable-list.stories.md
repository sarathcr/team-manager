# EditableList

## Description

A convenience directive for applying styling to a editablelist.

## Usage

### Default

```js
<app-editable-list></app-editable-list>
```

### With properties

```js
 <app-editable-list
              [variant]="optional"
              [list]="[{ id: 1, name: 'Name one'}]"
              [maxLength]="150"
              [isTextareaActive]="true"
              [initFocus]="true"
              editModalTitle="STANDARDS.project_standards_extrastandards_edit_title"
              editModalLabel="STANDARDS.project_standards_extrastandards_edit_label"
              editModalbuttonLabel="PROJECT.project_button_save"
              deleteModalTitle="STANDARDS.project_standards_extrastandards_delete_confirmation_title"
              deleteModalDescription="STANDARDS.project_standards_extrastandards_delete_confirmation_message"
              deleteModalbuttonLabel="PROJECT.project_button_delete"
              helperText="PROJECT.project_input_singleitem_helpertext"
              errorText="PROJECT.Error_textlimit_specified_singleinput"
              optionalButtonLabel="OBJECTIVES.project_objectives_criteriawindow_add"
              optionalTitle="STANDARDS.project_standards_extrastandards_input"
              optionalPlaceholder="STANDARDS.project_standards_extrastandards_placeholder"
               [lineLimit]="5"
              (addItem)="textareaDataChange($event)"
              (editItem)="textItemEdit($event, i)"
              (deleteItem)="textItemDelete($event, i)"
              (textareaActive)="updateEditableListStatus(competency.id)"></app-editable-list>

```

## Properties

### Input

| Name              | Type               | Required | Values               |  Default  | Description                                  |
| ----------------- | ------------------ | :------: | -------------------- | :-------: | -------------------------------------------- |
| `list`     | `object`           |    -     | -                    |     -     | To set the placeholder of textarea component |
| `maxLength`           | `number`           |    -     | -                    |     -     | Used to set the maximum length of editable list component                        |
| ` variant` | `string`           |    -     | -                    |     `default`    | To set the variant of textareaComponent  |
| `editModalTitle`| `string`           |    -     | -                    |     -     | To edit the modal title            |
| `editModalLabel`       | -           |    -     | -                    |     -     | To edit the modal label          |
| `editModalbuttonLabel`            | `string`     |    -     | -                    |  - | To edit the modal buttonlabel size                     |
| `deleteModalTitle`         | `string` |    -     |  | - | To delete the modal title                    |
| `deleteModalDescription`      | `String`           |    -     | -                    |     -     | To delete the modal description                      |
| `deleteModalbuttonLabel`       | `string`          |    -     | -                    |  - | To delete the modal buttonlabel                |
| `helperText`       | `string`           |    -     | -                    |      | To display the validation  message               |
| `errorText`           | `string`           |    -     | -                    |     -     | To display the validation message                              |
| `optionalButtonLabel`     | `string`           |    -     | -                    |     -     | To set the  optional button label |
| `optionalPlaceholder`     | `string`           |    -     | -                    |     -     | To set the optionalplaceholder |
| `linelimit`     | `number`           |    -     | -                    |     -     | To set the line limit |
| `isTextareaActive`     | `number`           |    -     | -                    |     -     | To activate the textarea |
| `initFocus`     | `boolean`           |    -     | -                    |     -     | To set the focus when click optionbutton Label  |
| `optionalTitle`     | `boolean`           |    -     | -                    |     -     | To set the optional title of the textarea list  |

### Output

| Name          | Description                              |
| ------------- | ---------------------------------------- |
| `editItem` | Event emited from the editablelist component |
| `deleteItem` | Event emited from the editablelist component |
| `addItem` | Event emited from the editablelist component |
| `textareaActive`| Event emited from the editablelist component |


### Validation

In this project, editlist is used the ValidatorComponent.
The textarea used from ValidatorComponent are :

<ul>
<li>`maxlength`</li>
<li>`helperText`</li>
<li>`errorText`</li>
</ul>

[Click here to get more details about Validation props](?path=/info/shared-validator--default)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
