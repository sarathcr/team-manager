# Sidebar

## Description

A convenience directive for applying styling to a sidebar component in project-editor module.

## Usage

### Default

```js
<app-sidebar></app-sidebar>
```

### With properties

```js
 <app-sidebar
      title="{{ 'STEPS_MENU.project_structure_stepsmenu_title' | translate }}"
      [steps]="steps">
</app-sidebar>
```

## Properties

### Input

| Name    |   Type   | Required | Values | Default | Description                        |
| ------- | :------: | :------: | :----: | :-----: | ---------------------------------- |
| `title` | `string` |    -     |   -    |    -    | To set title for sidebar component |
| `steps` |  `any`   |    -     |   -    |    -    | To set the steps                   |

### Step Menu

In this project, sidebar using the StepMenuComponent.
The inputs used from StepMenuComponent are :

<ul>
<li>`stepid`</li>
<li>`state`</li>
<li>`name`</li>
</ul>

[Click here to get more details about step-menu props](?path=/info/project-editor-step-menu--default)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
