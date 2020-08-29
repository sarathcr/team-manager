# Error-toast

## Description

A convenience directive for applying styling to an Error-toast component.

## Usage

### Default

```js
<app-error-toast></app-error-toast>
```

### With properties

```js
<app-error-toast
  [errors]="errors"
  [dissmissble]="true"
  [timeout]="10000"
  [maxLimit] = 3
  [type]="danger"
></app-error-toast>
```

## Properties

### Input

| Name              |      Type      | Required |          Values           | Default | Description                                                             |
| ----------------- | :------------: | :------: | :-----------------------: | :-----: | ----------------------------------------------------------------------- |
| `errors`         | `object` |    -     | `danger` `info` `warning` `success` |    `danger`    | To set the error message and status for error-toast component                                            |
| `dissmissble`     |       `boolean`        |    -     |             -             |   `false`    | To set the close icon  for error-toast component                                         |
| `timeout`           |    `number`    |    -     |             -             |    -    |To set the time interval for showing the error-toast                                    |
| `maxLimit`           |    `number`    |    -     |             -             |    `3 `   | To set the maximum limit  for error-toast component                                    |
| `type`       |    `ErrorType`    |    -   |              `danger` `info` `warning` `success`            |    `danger`    | To set types of error-toast component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
