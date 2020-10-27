# material card

## Description

A convenience directive for applying styling to a Add File.

## Usage

### Default

```js
<app-add-file></app-add-file>
```

### With properties

```js
<app-add-file 
      [acceptedType]="acceptType"
      [entityType]="entityType"
      >
</app-add-file>
```

## Properties

### Input

| Name           | Type     | Required | Values | Default | Description                           |
| -------------- | -------- | :------: | ------ | :-----: | ------------------------------------- |
| `acceptedType` | `string` |    -     | -      |    -    | To set accepted types                 |
| `entityType`   | `entityType` |    -     | 'activity' , 'exercise' , 'instrument'     |    -    | Entity types                 |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
