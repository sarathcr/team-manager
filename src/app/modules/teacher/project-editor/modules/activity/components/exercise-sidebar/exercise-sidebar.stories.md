# Input

## Description

A convenience directive for applying styling to an Input component.

## Usage

### Default

```js
<app-exercise-sidebar></app-exercise-sidebar>
```

### With properties

```js
<app-exercise-sidebar *ngFor="let exercise of exercises"></app-exercise-sidebar>
```

## Properties

### Input

| Name        |    Type    | Required | Values |                   Default                   | Description                         |
| ----------- | :--------: | :------: | :----: | :-----------------------------------------: | ----------------------------------- |
| `exercises` | `Exercise` |    -     |   -    | `id` `name` `state: DEFAULT or NOTIFICATON` | It allows adde content in the array |

## Note

In this documentation we used SidebarComponent. For getting more detailed view about StepMenuComponent.
This document is written based on implemented features, in future it may varry depends on new implemetations.
