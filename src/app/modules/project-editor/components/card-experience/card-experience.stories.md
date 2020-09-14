# Card Experience

## Description

A card component for listing project details.

## Usage

### Default

```js
<app-card-experience></app-card-experience>
```

### With properties

```js
    <app-card-experience
    [data]="project"
    [status]="project.status"
    [notification]="true"
    experienceType="UNIDAD DIDÁCTICA">
      </app-card-experience>
```

## Properties

### Input

| Name           |    Type     | Required |              Values               | Default | Description                                                    |
| -------------- | :---------: | :------: | :-------------------------------: | :-----: | ------------------------------------------------------------ - |
|`data`          |  `object`   |    -     |                -                  |    -    | To set experience data required for the card                   |
|`status`        |  `string`   |    -     |`inprogress, done, draft, readonly`| `draft` | To set status of the related project                           |
|`experienceType`|  `string`   |    -     |                -                  |    -    | To set project type in card                                    |
|`notification`  |  `boolean`  |    -     |           `true/false`            | `false` | To show notification in card                                   |


## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.