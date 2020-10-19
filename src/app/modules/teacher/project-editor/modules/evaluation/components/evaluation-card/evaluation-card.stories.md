# Input

## Description

A convenience directive for applying styling to an Input component.

## Usage

### Default

```js
<app-exercise-sidebar></app-exercise-sidebar>
```

### With properties

```js
<app-exercise-sidebar></app-exercise-sidebar>
```

## Properties

### Input

| Name                |   Type    | Required | Values | Default | Description                                                                                                                    |
| ------------------- | :-------: | :------: | :----: | :-----: | ------------------------------------------------------------------------------------------------------------------------------ |
| `title`             | `string`  |    -     |   -    |    -    | To set the title                                                                                                               |
| `percentage`        | `number`  |    -     |   -    |    -    | If is below or above than 100 the warn icon is shown and if is 100 the start icon is shown                                     |
| `clickableLabel`    | `boolean` |    -     |   -    |    -    | If is 'clickableLabel' and 'isExercise' are true and 'percentage' value is 0 then the 'Assign Percentage' label is shown       |
| `isExercise`        | `boolean` |    -     |   -    |    -    | If is false the model of card is Final Average, else the card model is of type gradable.                                       |
| `isNotClasificable` | `boolean` |    -     |   -    |    -    | If is true and the 'isExercise' value is also true, the star icon changes to one with a slash and shown "No calificable" lable |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
