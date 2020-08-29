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
<app-switch [switchOn]="true" [textOn]="On" [textOff]="Off" [disabled]="disabled"></app-switch>
```

## Properties

### Input

| Name       | Type      | Required | Values         | Default | Description                            |
| ---------- | --------- | :------: | -------------- | :-----: | -------------------------------------- |
| `switchOn` | `boolean` |    -     | `false` `true` | `false` | to set switch on or off by default     |
| `textOn`   | `text`    |    -     | `On`           |  `On`   | to set switch text TAG on switched On  |
| `textOff`  | `text`    |    -     | `Off`          |  `Off`  | to set switch text TAG on switched Off |
| `disabled` | `boolean` |    -     | `false` `true` | `false` | to disable                             |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
