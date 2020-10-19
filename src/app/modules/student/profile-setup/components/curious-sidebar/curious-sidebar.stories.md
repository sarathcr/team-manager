# Curious Sidebar

## Description

A sidebar to show the curious registration flow and assets.

## Usage

### Default

```js
<app-curuious-sidebar></app-curuious-sidebar>
```

### With properties

```js
 <app-curuious-sidebar
      [stepData]="dummyStepdata">
</app-curuious-sidebar>
```

## Properties

### Input

| Name    |   Type   | Required | Values | Default | Description                        |
| ------- | :------: | :------: | :----: | :-----: | ---------------------------------- |
| `title` | `string` | - | - | - | Set the title of the step navigator |
| `stepData` |  `CuriousStepData`   |    -     |   `id`,`name`,`status`,`currentStep`,`assetUrl`    |    -    | To set the values in each step                   |


## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
