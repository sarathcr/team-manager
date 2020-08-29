# material card

## Description

A convenience directive for applying styling to a material card.

## Usage

### Default

```js
<app-material-card></app-material-card>
```

### With properties

```js
<app-material-card [link]="" [thumbnail]="" [label]="" [title]="" [variant]="'video'" [size]="'medium'" [showSwitch]="true" [switchOn]="true" [canDelete]="true" [draggable]="true" [validPreviewLink]="false"></app-material-card>
```

## Properties

### Input

| Name         | Type      | Required | Values                                        |                                                                       Default                                                                       | Description                                          |
| ------------ | --------- | :------: | --------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------- |
| `Title`      | `string`  |    -     | -                                             |                                       `¿Cuánto dabes de la historia, el arte y la cultura de la Edad Media?`                                        | title the element                                    |
| `label`      | `string`  |    -     | -                                             |                                                                   `Video / Audio`                                                                   | Type of document name                                |
| `link`       | `string`  |    -     | -                                             |                                                           `https://youtu.be/hGIW2fDb0jg`                                                            | URL to the element Video Link                        |
| `thumbnail`  | `string`  |    -     | -                                             | `https://images.ctfassets.net/hrltx12pl8hq/hXPLBHmnfgxw58CeaaADd/34e2f72481af47c654279ba6d4e18044/shutterstock_1469674187.jpg?fit=fill&w=800&h=400` | URL to the element Image                             |
| `Variant`    | `string`  |    -     | `video` `image` `form` `evaluation` `preview` |                                                                       `image`                                                                       | To show image, video, form or evaluation OR PREVIEW  |
| `size`       | `string`  |    -     | `medium` `small`                              |                                                                      `medium`                                                                       | Set the material size variant                        |
| `showSwitch` | `boolean` |    -     | `false` `true`                                |                                                                       `true`                                                                        | To show switch button or not                         |
| `switchOn`   | `boolean` |    -     | `false` `true`                                |                                                                       `false`                                                                       | to set switch on or off by default                   |
| `canDelete`  | `boolean` |    -     | `false` `true`                                |                                                                       `true`                                                                        | To show or not the delete X button                   |
| `draggable`  | `boolean` |    -     | `false` `true`                                |                                                                       `true`                                                                        | To show or not the draggable icon                    |
| `validPreviewLink` | `boolean` |    -     | `false` `true`                                |                                                                       `false`                                                                       | To know if the link is valid |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
