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
    [variant]="variant"
    [isInvited]="isInvited"
    (cardClick)="checkUserProfile(project)
    ></app-card-experience>
```

## Properties

### Input

| Name           |    Type     | Required |              Values               | Default   | Description                                                    |
| -------------- | :---------: | :------: | :-------------------------------: | :-----:   | ------------------------------------------------------------ - |
|`data`          |  `object`   |    -     |                -                  |    -      | To set experience data required for the card                   |
|`status`        |  `string`   |    -     |`inprogress, done, draft, readonly`| `draft`   | To set status of the related project                           |
|`variant`       |  `string`   |    -     |`teacher`, `student`, `template`   | `teacher` | To set variant of the card                          |
|`notification`  |  `boolean`  |    -     |           `true/false`            | `false`   | To show notification in card                                   |
|`isInvited`     |  `boolean`  |    -     |           `true/false`            | `false`   | To check whether invited or not                                |

### Output

| Name          | Description                           |
| ------------- | ------------------------------------- |
| `cardClick` | Event emited from the card experience component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.