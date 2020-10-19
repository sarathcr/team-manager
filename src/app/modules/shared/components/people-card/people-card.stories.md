# Modal Layout

## Description

A convenience directive for applying styling to a people card.

## Usage

### Default

```js
<app-people-card></app-people-card>
```
### With properties

```js
    <app-people-card
        [profileName]="profileName"
        [profileType]="profileType"
        [inviteLabel]="inviteLabel"
        [imageUrl]="imageUrl"
        [variant]="variant"
></app-people-card>
```

### Input

| Name           |     Type     | Required |           Values           |  Default   | Description                                  |
| -------------- | :----------: | :------: | :------------------------: | :--------: | -------------------------------------------- |
| `profileName`  |   `string`   |    -     |             -              |     -      | To set Name for profile                      |
| `profileType`  |   `string`   |    -     |             -              |     -      | To set Type for profile                      |
| `imageUrl`     |   `string`   |    -     |             -              |     -      | To set profile image                      |
| `inviteLabel`  |   `string`   |    -     |             -              |     -      | To set invite label                          |
| `variant`      |   `string`   |    -     |     `default` `invite`     |  `default` | To set cancel button label for modal layout   |

### Output


## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
