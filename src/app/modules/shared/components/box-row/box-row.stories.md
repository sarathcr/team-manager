# Curious Sidebar

## Description

Row to display information

## Usage

### Default

```js
<app-box-row></app-box-row>
```

### With properties

```js
 <BoxRowComponent [isHead]="isHead" [hasClose]="hasClose" [content]="content"></BoxRowComponent>
```

## Properties

### Input

|    Name           |   Type    | Required |       Values       |    Default    | Description                              |
| ----------------- | :-------: | :------: | :----------------: | :-----------: | -----------------------------------------|
| `isHead`          | `boolean` |  `false` |   `true` `false`   |    `false`    | To set whether componet is head          | 
| `hasClose`        | `boolean` |  `false` |   `true` `false`   |    `false`    | To set to add close button for component |
| `content`         | `string`  |  `false` |         -          |       -       | To add ng content data                   |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
