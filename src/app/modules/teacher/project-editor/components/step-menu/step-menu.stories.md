# Step Menu

## Description

A convenience directive for applying styles to step-menu component.

## Usage

### Default

```js
<app-step-menu></app-step-menu>
```

### With properties

```js
  <app-step-menu *ngFor="let step of steps" [step]="step"></app-step-menu>

```

## Properties

### Input

| Name   | Type   | Required |                  Values                   | Default | Description                                  |
| ------ | ------ | :------: | :---------------------------------------: | :-----: | -------------------------------------------- |
| `step` | `Step` |    -     | `id` `stepid` `sectionid` `state` `name` |    -    | To set different variants for step component |

## Note

In this documentation ,we used SidebarComponent for getting more detailed view about StepMenuComponent.
This document is written based on implemented features, in future it may varry depends on new implemetations.
