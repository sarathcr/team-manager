# Modal Info

## Description

A convenience directive for applying styling to a Modal Info component.

## Usage

### Default

```js
<app-modal-info></app-modal-info>
```

### With properties

```js
   <app-modal-info
    [variant]="'unlock'"
    [modalTitle]="'PROGRAMACION.output_dependancy_title'"
    [description]="'PROGRAMACION.output_dependancy_description'"
    [confirmLabel]="'PROGRAMACION.output_dependancy_button'"
    (confirm)="confirmModalUnlock()"
    (decline)="declineModal()">
    </app-modal-info>
```

## Properties

### Input

| Name           |         Type          | Required |                     Values                     |    Default     | Description                                        |
| -------------- | :-------------------: | :------: | :--------------------------------------------: | :------------: | -------------------------------------------------- |
| `variant`      |  `ModalInfoVariant`   |    -     | `information` `confirmation` `unlock` `delete` | `confirmation` | To set different variants for modal info component |
| `appearance`   | `ModalInfoAppearance` |    -     |               `default` `medium`               |   `default`    | To set the appearance for modal info               |
| `title`        |       `string`        |    -     |                       -                        |       -        | To set title for modal info                        |
| `overTitle`    |       `string`        |    -     |                       -                        |       -        | To set over title for modal info                   |
| `description`  |       `string`        |    -     |                       -                        |       -        | To set description for modal info                  |
| `confirmLabel` |       `string`        |    -     |                       -                        |       -        | To set confirm button label for modal info         |
| `theme`        |   `ModalInfoTheme`    |    -     |             `primary` `secondary`              |   `primary`    | To set description for modal info                  |
| `cancelLabel`  |           -           |    -     |                       -                        |   `Cancelar`   | To set cancel button label for modal info          |

### Output

| Name      | Description                                            |
| --------- | ------------------------------------------------------ |
| `decline` | Event emited from the modal info component for decline |
| `confirm` | Event emited from the modal info component for confirm |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
