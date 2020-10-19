# Checkbox

## Description

A convenience directive for applying styling to an checkbox component.

## Usage

### Default

```js
<app-checkbox></app-checkbox>
```

### With properties

```js
<app-checkbox
  [isChecked] ="false"
  [disabled]="false"
  formControlName="checkbox"
>
</app-checkbox>
```

## Properties

### Input

|    Name           |   Type    | Required |       Values       |    Default    | Description                           |
| ----------------- | :-------: | :------: | :----------------: | :-----------: | ------------------------------------- |
| `isChecked`       | `boolean` |  `false` |   `true` `false`   |    `false`    | To set checked property of checkbox   |
| `disabled`        | `boolean` |  `false` |   `true` `false`   |    `false`    | To set disabled property of checkbox  |
| `formControlName` | `string`  |  `false` |         -          |       -       | To enable angular form in checkbox    |

## Note

This document is written based on the implemented features. In future it may vary up on the new implemetations.
