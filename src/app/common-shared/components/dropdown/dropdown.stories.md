# Dropdown List

## Description

A convenience directive for applying styling to a dropdown.

## Usage

### Default

```js
<app-dropdown></app-dropdown>
```

### With properties

```js
<app-dropdown
 position="right"
  [list]="[{ icon: 'icon-ic_copy',
          text: 'Duplicar',
          action: 'clone',}]">
</app-dropdown>
```

## Properties

### Input

| Name   | Type                   | Required | Values                  | Default | Description                           |
| ------ | ---------------------- | :------: | ----------------------- | :-----: | ------------------------------------- |
| `list` | `list`                 |    -     | -                       |    -    | to set data of the component          |
| `list` | `DropdownListPosition` |    -     | `right` `left` `center` | `right` | to change the postion of dropdownlist |

### Output

| Name         | Description                                     |
| ------------ | ----------------------------------------------- |
| `actionToDo` | Event emited from the actions.tooltip component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
