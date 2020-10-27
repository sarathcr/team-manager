# Chipset

## Description

A convenience directive for applying styling to a chipset.

## Usage

### Default

```js
<app-chipset></app-chipset>
```

### With properties

```js
<app-chipset
[chips]="test@opentrends.net"
               [invalidChips]="test@opentrends"
               [label]="Email/s"
               [initFocus]="true"
               [placeholder]=" Escribe o pega el listado de e-mails de los docentes que quieras "
               [variant]="email"
               (chipset)="chipset($event)" >
</app-chipset>
```

## Properties

### Input

| Name   | Type                   | Required | Values                  | Default | Description                           |
| ------ | ---------------------- | :------: | ----------------------- | :-----: | ------------------------------------- |
| `chips` | `object`                 |    -     | -                       |    -    | valid email id |
| `invalidChips` | `object` |    -     | - |- |invalid maild id |
| `label` | `string`                 |    -     | -                       |    -    | to set label of the component          |
| `initFocus` | `boolean` |    -     | - | - | to set the initial focus of component |
| `placeholder` | `string`                 |    -     | -                       |    -    | to set placeholder for  the component          |
| `variant` | `string` |    -     | - | -| to set the variant for chipset component|

### Output

| Name         | Description                                     |
| ------------ | ----------------------------------------------- |
| `chipset` | Event emited from the chipset component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
