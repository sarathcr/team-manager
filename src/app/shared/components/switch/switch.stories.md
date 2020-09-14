# Button

## Description

A convenience directive for applying styling to a switch button.

## Usage

### Default

```js
<app-switch></app-switch>
```

### With properties

```js
<app-switch [switchOn]="true" [textOn]="On" [textOff]="Off" [disabled]="disabled" [type]="default" [iconOne]="iconOne" [iconTwo]="iconTwo" [buttonTextOne]="buttonTextOne" [buttonTextTwo]="buttonTextTwo"></app-switch>
```

## Properties

### Input

| Name            | Type      | Required | Values             | Default   | Description                            |
| --------------- | --------- | :------: | ------------------ | :-------: | -------------------------------------- |
| `switchOn`      | `boolean` |    -     | `false` `true`     | `false`   | to set switch on or off by default     |
| `textOn`        | `text`    |    -     | `On`               |  `On`     | to set switch text TAG on switched On  |
| `textOff`       | `text`    |    -     | `Off`              |  `Off`    | to set switch text TAG on switched Off |
| `disabled`      | `boolean` |    -     | `false` `true`     | `false`   | to disable                             |
| `type`          | `string`  |    -     | `default` `button` | `default` | to set the type of swith               |
| `iconOne`       | `string`  |    -     |         -          |     -     | to add icon for switch button type     |
| `iconTwo`       | `string`  |    -     |         -          |     -     | to add icon for switch button type     |
| `buttonTextOne` | `string`  |    -     |         -          |     -     | to add button text for switch type     |
| `buttonTextTwo` | `string`  |    -     |         -          |     -     | to add button text for switch type     |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
