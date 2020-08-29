# Editor Header

## Description

A convenience directive for applying styling for editor header component.

## Usage

### Default

```js
<app-editor-header></app-editor-header>
```

### With properties

```js
<app-editor-header
    [projectData]="editor.titleData"
    [stepOneStatus]="stepOne.state"
    (titleSubmit)="editor.handleSubmit($event)">
</app-editor-header>
```

## Properties

### Input

| Name            |      Type      | Required |                       Values                        | Default | Description                                               |
| --------------- | :------------: | :------: | :-------------------------------------------------: | :-----: | --------------------------------------------------------- |
| `projectData`   | `ProjectTitle` |    -     |                    `id` `title`                     |    -    | To set the title for the project                          |
| `stepOneStatus` |    `string`    |    -     |            `INPROCESS` `DONE` `PENDING`             |    -    | To set different variants for the themes in header button |
| `labels`        |    `Labels`    |    -     | `structure` `activities` `evaluation` `buttonLabel` |    -    | An object, used to set labels for header tabs and button  |

### Output

| Name          | Description                                      |
| ------------- | ------------------------------------------------ |
| `titleSubmit` | Event emited from the modal in the project title |

### Modal Info

In this project, header in project-editor using the ModalInfoComponent.
The inputs used from ModalInfoComponent are :

<ul>
<li>`title`</li>
<li>`description`</li>
<li>`confirmLabel`</li>
</ul>

[Click here to get more details about modal-info props](?path=/info/shared-modal-info--unlock)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
