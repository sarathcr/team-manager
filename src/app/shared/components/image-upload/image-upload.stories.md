# Image-upload

## Description

A convenience directive for applying styling to a Image-upload component in project-editor module.

## Usage

### Default

```js
<app-image-upload></app-image-upload>
```

### With properties

```js
 <app-image-upload
      [maxFileSize]="5242880"
      [acceptedType]="image/jpeg,image/jpg,image/png"
      [label]="Cargar archivo"
      [imageURL]="creativeImage">
</app-image-upload>
```

## Properties

### Input

| Name    |   Type   | Required | Values | Default | Description                        |
| ------- | :------: | :------: | :----: | :-----: | ---------------------------------- |
| `imageURL` | `string` |    -     |   -    |    -    | URL of image to upload |
| `label` |  `string`   |    -     |   -    |    -    | To set the label  |
| `maxFileSize` | `string` |    -     |   -    |    -    | To set maximum file size of imagefile |
| `acceptedType` | `string` |    -     |   -    |    -    | To set accepted types |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
