# Step Unlock

## Description

A convenience directive for applying styling for step-unlock component.

## Usage

### Default

```js
<app-step-unlock></app-step-unlock>
```

### With properties

```js
 <app-step-unlock
          [description]="'STANDARDS.project_standards_dependancy_description'"
          [buttonText]="'STANDARDS.project_standards_dependancy_button'"
          [buttonLink]="'../3'">
</app-step-unlock>
```

## Properties

### Input

| Name          |   Type   | Required | Values | Default | Description                                     |
| ------------- | :------: | :------: | :----: | :-----: | ----------------------------------------------- |
| `title`       | `string` |    -     |   -    |    -    | To set title for step-unlock component          |
| `description` | `string` |    -     |   -    |    -    | To set description for step-unlock component    |
| `buttonText`  | `string` |    -     |   -    |    -    | To set text for button in step-unlock component |
| `buttonLink`  | `string` |    -     |   -    |    -    | To set link for button in step-unlock component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
