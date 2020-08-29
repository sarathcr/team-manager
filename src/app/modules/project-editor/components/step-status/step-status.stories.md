# Step Status

## Description

A convenience directive for applying styling to a step-status component.

## Usage

### Default

```js
<app-step-status></app-step-status>
```

### With properties

```js
<app-step-status [status]="step.state"></app-step-status>

```

## Properties

### Input

| Name     | Type     | Required | Values                       | Default | Description                                    |
| -------- | -------- | :------: | ---------------------------- | :-----: | ---------------------------------------------- |
| `status` | `Status` |    -     | `INPROCESS` `DONE` `PENDING` |    -    | To set different variants for status component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
