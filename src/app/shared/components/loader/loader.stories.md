# Loader

## Description

A convenience directive for applying loaders.

## Usage

### Default

```js
<app-loader></app-loader>
```

### With properties

```js
    <app-loader variant="default" theme="primary" size="large"></app-loader>

```

## Properties

### Input

| Name      | Type             | Required | Values                              |  Default  | Description                             |
| --------- | ---------------- | :------: | ----------------------------------  | :-------: | --------------------------------------- |
| `variant` | `LoaderVariants` |    -     | `block` `default`                   | `default` | To set variants to the loader component |
| `theme`   | `LoaderTheme`    |    -     | `primary` `secondary` `teritiary`   | `primary` | To set theme to the loader component |
| `size`    | `LoaderSize`     |    -     | `small` `medium` `large`            | `large`   | To set size to the loader component |


## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
