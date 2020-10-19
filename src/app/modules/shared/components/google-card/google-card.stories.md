# google card

## Description

A convenience directive for applying styling to a google card.

## Usage

### Default

```js
<app-google-card></app-google-card>
```

### With properties

```js
<app-google-card [cardTitle]="" [cardSubtitle]="" [variant]="'DOCUMENT'" ></app-google-card>
```

## Properties

### Input

| Name           | Type     | Required | Values                                                                       | Default | Description                              |
| -------------- | -------- | :------: | ---------------------------------------------------------------------------- | :-----: | ---------------------------------------- |
| `cardTitle`    | `text`   |    -     | -                                                                            |    -    | title the element                        |
| `cardSubtitle` | `text`   |    -     | -                                                                            |    -    | subtitle the element                     |
| `Variant`      | `option` |    -     | `PRESENTATION` `WEB` `DOCUMENT` `SHEET` `FORM` `RUBRICA` `CHECKLIST` `DIANA` |    -    | To show image, video, form or evaluation |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
