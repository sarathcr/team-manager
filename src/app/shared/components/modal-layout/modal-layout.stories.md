# Modal Layout

## Description

A convenience directive for applying styling to a Modal Layout component.

## Usage

### Default

```js
<app-modal-layout></app-modal-layout>
```

### With properties

```js
    <app-modal-layout
    title="ACTIVITY_POPUPS.definition_strategy_popup_title"
    confirmLabel="ACTIVITY_POPUPS.definition_generic_popup_button"
    (decline)="declineModal($event)"
    (confirm)="confirmModal($event)"
>Content</app-modal-layout>
```

## Properties

### Input

| Name           |         Type          | Required |                     Values                     |    Default     | Description                                        |
| -------------- | :-------------------: | :------: | :--------------------------------------------: | :------------: | -------------------------------------------------- |
| `title`        |       `string`        |    -     |                       -                        |       -        | To set title for modal layout                   |
| `confirmLabel` |       `string`        |    -     |                       -                        |       -        | To set confirm button label for modal layout    |
| `cancelLabel`  |           -           |    -     |                       -                        |   `Cancelar`   | To set cancel button label for modal layout     |

### Output

| Name      | Description                                            |
| --------- | ------------------------------------------------------ |
| `decline` | Event emited from the modal layout component for decline |
| `confirm` | Event emited from the modal layout component for confirm |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
