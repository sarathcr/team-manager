# Modal Form

## Description

A convenience directive for applying styling to a Modal Form component.

## Usage

### Default

```js
<app-modal-form></app-modal-form>
```

### With properties

```js
   <app-modal-form
    [variant]="'input'"
    [title]="modalTitle"
    [confirmLabel]="modalConfirmLabel"
    [data]="projectData?.title ? this.projectData?.title : ''"
    [maxLength]="maxLength"
    helperText="PROJECT.project_title_helpertext"
    errorText="PROJECT.Error_textlimit_specified_singleinput"
    label="PROJECT.project_title_input_title"
    (decline)="declineModal()"
    (confirm)="confirmModal($event)">
    </app-modal-form>
```

## Properties

### Input

| Name           |        Type        | Required |       Values       | Default | Description                                                                  |
| -------------- | :----------------: | :------: | :----------------: | :-----: | ---------------------------------------------------------------------------- |
| `variant`      | `ModalFormVariant` |    -     | `input` `textarea` | `input` | To set different variants for modal form component                           |
| `title`        |      `string`      |    -     |         -          |    -    | To set title for modal form                                                  |
| `confirmLabel` |         -          |    -     |         -          | `Crear` | To set text for button component                                             |
| `data`         |      `string`      |    -     |         -          |    -    | To set data for modal form                                                   |
| `label`        |      `string`      |    -     |         -          |    -    | To set label for modal form                                                  |
| `maxlength`    |      `number`      |    -     |         -          |    -    | To set the maximum length for the text to be written in modal form component |

### Output

| Name      | Description                                            |
| --------- | ------------------------------------------------------ |
| `decline` | Event emited from the modal form component for decline |
| `confirm` | Event emited from the modal form component for confirm |

### Validation

In this project, input field is used the ValidatorComponent.
The inputs used from ValidatorComponent are :

<ul>
<li>`maxlength`</li>
<li>`helperText`</li>
<li>`errorText`</li>
</ul>

[Click here to get more details about Validation props](?path=/info/shared-validator--default)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
