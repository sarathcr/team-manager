# Header

## Description

A convenience directive for applying styling to header component.

## Usage

### Default

```js
<app-header></app-header>
```

### With properties

```js
<app-header
  [filename]="fileName"
  [currentPage]="pageVariable"
  [totalPages]="totalPages"
  [zoomAmt]="zoom"
  [zoomMax]="zoomMax"
  [zoomMin]="zoomMin"
  [loading]="loading"
  downloadButtonLabel="PROGRAMACION.output_button_download"
  printButtonLabel="PROGRAMACION.output_button_print"
  (setZoom)="setZoom($event)"
  (download)="download()"
  (print)="print()">
</app-header>
```

## Properties

### Input

| Name                  |   Type    | Required | Values | Default | Description                      |
| --------------------- | :-------: | :------: | :----: | :-----: | -------------------------------- |
| `filename`            |     -     |    -     |   -    |    -    | To set name of the file          |
| `downloadButtonLabel` | `string`  |    -     |   -    |    -    | To set label for download button |
| `printButtonLabel`    | `string`  |    -     |   -    |    -    | To set label for print button    |
| `currentPage`         | `number`  |    -     |   -    |    -    | To set current page number       |
| `totalPages`          | `number`  |    -     |   -    |    -    | To set total number of pages     |
| `zoomAmt`             | `number`  |    -     |   -    |    -    | To set zoom amount               |
| `zoomMax`             | `number`  |    -     |   -    |    -    | To set maximum zoom size         |
| `zoomMin`             | `number`  |    -     |   -    |    -    | To set minimum zoom size         |
| `loading`             | `boolean` |    -     |   -    |    -    | To enable loading option         |

### Output

| Name       | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| `setZoom`  | Event emited from the header component to set zoom functionality         |
| `download` | Event emited from the header component to download content in the page   |
| `print`    | Event emited from the header component to take print content in the page |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
