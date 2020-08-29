# Checkbox

## Description

A convenience directive for applying styling to an checkbox component.

## Usage

### Default

```js
<app-custom-checkbox></app-custom-checkbox>
```

### With properties

```js
<app-custom-checkbox
    [isHead] ="false"
    [checkboxData]="checkboxData"
    [parentID]="20"
    [colOne]="{ value: column.colOneData }"
    [colTwo]="{ value: column.colTwoData }"
    [colThree]="{ value: column.colThreeData}"
    [colFour]="{ value: column.colFourData }"
    [changeBg]="false"
    [clickableLabel]="true"
    (checked)="checked($event)">
</app-custom-checkbox>
```

## Properties

### Input

| Name             |       Type       | Required |                                                             Values                                                             | Default | Description                                          |
| ---------------- | :--------------: | :------: | :----------------------------------------------------------------------------------------------------------------------------: | :-----: | ---------------------------------------------------- |
| `checkboxData`         | `checkboxData` |    -     | `checked` `variant`|    `checked`   | it will be hide the  checkbox when uncheck a row      |
| `parentID`          |      `number`       |    -     |                                                               -                                                                |    -    | to set the parent id for checkbox component                 |
| `colOne`         | ` CheckBoxColumn` |    -     | ` value` `size`|    -    | To set checkboxcolumn for checkbox component          |
| `colTwo`         | ` CheckBoxColumn` |    -     | ` value` `size`|    -    | To set checkboxcolumn for checkbox component          |
| `colThree`         | ` CheckBoxColumn` |    -     | ` value` `size`|    -    | To set checkboxcolumn for checkbox component          |
| `colFour`         | ` CheckBoxColumn` |    -     | ` value` `size`|    -    | To set checkboxcolumn for checkbox component          |
| `changeBg`    |    `boolean`     |    -     |                                                               -                                                                | `false`  | To Change the background colour for checkbox component |
| `clickableLabel` |    `boolean`     |    -     |                                                                                                                             |    `true`   | To enable the label      |

### Output

| Name             | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| ` checked` | Event emited from the checkbox component  |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
