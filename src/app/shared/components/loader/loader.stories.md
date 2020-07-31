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
    <app-loader *ngIf="loading; else loaded" variant="block"></app-loader>

```

## Properties

### Input

| Name      | Type             | Required | Values            |  Default  | Description                             |
| --------- | ---------------- | :------: | ----------------- | :-------: | --------------------------------------- |
| `variant` | `LoaderVariants` |    -     | `block` `default` | `default` | To set variants to the loader component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
