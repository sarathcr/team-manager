# Presentation Card

## Description

A convenience directive for applying styling to a Presentation.

## Usage

### Default

```js
<app-presentation-card></app-presentation-card>
```

### With properties

```js
<app-presentation-card
    [variant]="default"
    [isPremium]="false"
    [isComingSoon]="false"
    [title]="title"
    [imageURL]="imageURL"
    [premiumLabel]="premiumLabel"
    [description]="description"
    [iconVariant]="iconVariant"
    >
</app-presentation-card>
```

## Properties

### Input

| Name              | Type               | Required | Values                        |  Default  | Description                                      |
| ----------------- | ------------------ | :------: | ----------------------------- | :-------: | --------------------------------------------     |
| `variant`         | `String`           |    -     | `create` `default` `project`  | `default` | To set the variant of component                  |
| `isPremium`       | `boolean`          |    -     | -                             | `false`   | Used to set the Premium label on component       |
| `isComingSoon`    | `boolean`          |    -     | -                             | `false`   | Used to set the Coming Soon label on component   |
| `title`           | `String`           |    -     | -                             |     -     | To set the Caption title of component            |
| `premiumLabel`    | `String`           |    -     | -                             |     -     | To set the coming soon/premium label of component|
| `description`     | `String`           |    -     | -                             |     -     | To set the description content of the component  |
| `imageURL`        | `String`           |    -     | -                             | `https://images.pexels.com/photos/3469600/pexels-photo-3469600.jpeg`     | To set the background image of component     |
| `iconVariant`        | `IconVariant`           |    -     | -                      |  -     | Icon  variant component     |


### Output

### Validation

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
