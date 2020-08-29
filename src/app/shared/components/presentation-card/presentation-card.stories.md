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
    [title]="title"
    [imageURL]="imageURL"
    >
</app-presentation-card>
```

## Properties

### Input

| Name              | Type               | Required | Values               |  Default  | Description                                  |
| ----------------- | ------------------ | :------: | -------------------- | :-------: | -------------------------------------------- |
| `variant`         | `String`           |    -     | `create` `default`   | `default` | To set the variant of component              |
| `isPremium`       | `boolean`          |    -     | -                    | `false`   | Used to set the Premium label on component   |
| `title`           | `String`           |    -     | -                    |     -     | To set the Caption title of component        |
| `imageURL`        | `String`           |    -     | -                    | `https://images.pexels.com/photos/3469600/pexels-photo-3469600.jpeg`     | To set the background image of component     |


### Output

### Validation

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
