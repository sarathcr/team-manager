# material card

## Description

A convenience directive for applying styling to a Add File.

## Usage

### Default

```js
<app-add-file></app-add-file>
```

### With properties

```js
<app-add-file [maxFileSize]="5242880"
      [acceptedType]="doc,docx,pdf,xls,xlsx"
      [label]="Cargar archivo"
      [fileURL]="creativeFile" >
</app-add-file>
```

## Properties

### Input

| Name           | Type     | Required | Values | Default | Description                           |
| -------------- | -------- | :------: | ------ | :-----: | ------------------------------------- |
| `fileURL`      | `string` |    -     | -      |    -    | URL of image to upload                |
| `label`        | `string` |    -     | -      |    -    | To set the label                      |
| `maxFileSize`  | `string` |    -     | -      |    -    | To set maximum file size of imagefile |
| `acceptedType` | `string` |    -     | -      |    -    | To set accepted types                 |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
