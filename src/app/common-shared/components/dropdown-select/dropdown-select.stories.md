# Button

## Description

A convenience directive for a dropdown select .

## Usage

### Default

```js
<app-dropdown-select></app-dropdown-select>
```

### With properties

```js
    <app-dropdown-select
    [data]="data"
    [label]="label"
    [placeholder]="placeholder"
    [textField]="textField"
    [noDataAvailablePlaceholder]="noDataAvailablePlaceholder"
    [maxHeight]="maxHeight"
    [multiSelection]="multiSelection"
    [canDeselect]="canDeselect"
    [defaultSelected]="defaultSelected"
    [disabled]="disabled"
    [selectedItems]="selectedItems"
    (dropdownSelect)="dropdownSelect($event)"
    ></app-dropdown-select>
```

## Properties

### Input

| Name                         | Type                   |       Required        | Values | Default | Description                                        |
| ---------------------------- | ---------------------- | :-------------------: | ------ | :-----: | -------------------------------------------------- |
| `data`                       | `list`                 |           -           | -      |    -    | to set data of the component                       |
| `label`                      | `string`               |           -           | -      |    -    | to set label of the component                      |
| `placeholder`                | `string`               |           -           | -      |    -    | to set placeholder of the component                |
| `textField`                  | `string`               |           -           | -      |    -    | to set textfield name of the component             |
| `noDataAvailablePlaceholder` | `string`               |           -           | -      |    -    | to set no data placeholder of the component        |
| `maxHeight`                  | `number`               |           -           | -      |  `250`  | to set maxheight of dropdown list of the component |
| `multiSelection`             | `boolean`              |           -           | -      | `false` | to set multiselection of the component             |
| `canDeselect`                | `boolean`              |           -           | -      | `false` | to set deselect of selected items                  |
| `defaultSelected`            | `boolean`              |           -           | -      | `false` | to set a default selected of the component         |
| `disabled`                   | `boolean`              |           -           | -      | `false` | to set disabled of the component                   |
| `position`                   | `DropdownListPosition` | `right, left, center` | -      | `right` | to set selected items of the component             |
| `selectedItems`              | `list`                 |           -           | -      |    -    | to set selected items of the component             |

### Output

| Name             | Description                                     |
| ---------------- | ----------------------------------------------- |
| `dropdownSelect` | Event emited from the dropdown select component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
