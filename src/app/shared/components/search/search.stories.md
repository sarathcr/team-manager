# Search

## Description

A convenience directive for applying styling to a search.

## Usage

### Default

```js
<app-search></app-search>
```

### With properties

```js
<app-search
 [placeholder] =" "
 (searchTitle)="searchChanged($event)"
 >
</app-search>
```

## Properties

### Input

| Name          | Type     | Required | Values | Default | Description                                |
| ------------- | -------- | :------: | ------ | :-----: | ------------------------------------------ |
| `placeholder` | `String` |    -     | -      |    -    | To set the placeholder of search component |
| `text`        | `String` |    -     | -      |    -    | To search project by title                 |

### Output

| Name          | Description                           |
| ------------- | ------------------------------------- |
| `searchText` | Event emited from the search component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
