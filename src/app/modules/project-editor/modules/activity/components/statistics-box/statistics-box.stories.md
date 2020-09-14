# statistics box

## Description

A convenience directive for applying styling to a statistics box.

## Usage

### Default

```js
<app-statistics-box></app-statistics-box>
```

### With properties

```js
<app-statistics-box [variant]="StatisticsVariant" [data]="Box" (action)="updateInfo($event)" ></app-statistics-box>
```

## Properties

### Input

| Name            | Type                | Required | Values           |    Default    | Description                              |
| --------------- | ------------------- | -------- | :--------------: | ------------- | :--------------------------------------: |
| `variant`       | `StatisticsVariant` |    -     | `resume` `chart` | -             | statistics of the box                    |
| `data`          | `Box`               |    -     | -                | -             | the box when show the statistics         |


### Output

| Name     | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
| `action` | Event emited from the action of the box                                    |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
