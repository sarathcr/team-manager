
# Sidebar

## Description

A convenience directive for applying styling to a sidebar component in project-output module.

## Usage

### Default

```js
<app-sidebar></app-sidebar>
```

### With properties

```js
 <app-sidebar
    [outline]="outline"
    (navigateTo)="navigateTo($event)">
</app-sidebar>
```

## Properties

### Input

| Name      |   Type   | Required | Values  | Default | Description                         |
| --------- | :------: | :------: | :-----: | :-----: | ----------------------------------- |
| `outline` |  `any`   |    -     | `title` |    -    | To set labels for sidebar component |
| `title`   | `string` |    -     |    -    |    -    | To set title for sidebar component  |

### Output

| Name         | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `navigateTo` | Event emited from the sidebar component by click on the label |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
