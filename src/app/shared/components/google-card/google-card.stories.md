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
<app-google-card [title]="" [subtitle]="" [variant]="'doc'" ></app-google-card>
```

## Properties

### Input

| Name       | Type     | Required | Values                              |    Default    | Description                              |
| ---------- | -------- | :------: | ----------------------------------- | :-----------: | ---------------------------------------- |
| `Title`    | `text`   |    -     | -                                   |  `Documento`  | title the element                        |
| `Subtitle` | `text`   |    -     | -                                   | `Google Docs` | subtitle the element                     |
| `Variant`  | `option` |    -     | `slide` `site` `doc` `form` `sheet` |     `doc`     | To show image, video, form or evaluation |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
