# Project Title

## Description

A convenience directive for applying styling for project title component.

## Usage

### Default

```js
<app-project-title></app-project-title>
```

### With properties

```js
  <app-project-title
      [maxLength]="70"
      [projectData]="projectData"
      (titleSubmit)="handleTitleSubmit($event)">
</app-project-title>
```

## Properties

### Input

| Name          |      Type      | Required |    Values    | Default | Description                                                |
| ------------- | :------------: | :------: | :----------: | :-----: | ---------------------------------------------------------- |
| `projectData` | `ProjectTitle` |    -     | `id` `title` |    -    | To set the title for the project                           |
| `maxLength`   |    `number`    |    -     |      -       |    -    | To set maximum length for the charactors for project title |

### Output

| Name          | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `titleSubmit` | Event emited from the modal form component in the project title |

### Modal Form

In this project, project-title using the ModalFormComponent.
The inputs used from ModalFormComponent are :

<ul>
<li>`label`</li>
<li>`modalTitle`</li>
<li>`modalConfirmLabel`</li>
</ul>

[Click here to get more details about modal-form props](?path=/info/shared-modal-form--input)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
