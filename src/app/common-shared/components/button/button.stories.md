# Button

## Description

A convenience directive for applying styling to a button.

## Usage

### Default

```js
<app-button>{{ buttonLabel }}</app-button>
```

### With properties

```js
<app-button theme="primary" variant="contained" icon="tick" size="size" [disabled]="disabled">{{ buttonLabel }}</app-button>
```

## Properties

### Input

| Name                                  | Type             |        Required        | Values                                                                                      |   Default   | Description                                       |
| ------------------------------------- | ---------------- | :--------------------: | ------------------------------------------------------------------------------------------- | :---------: | ------------------------------------------------- |
| `theme`                               | `Theme`          |           -            | `primary` `secondary` `teritiary` `success`                                                 |  `primary`  | Based on button functionalities theme will varies |
| `disabled`                            | `boolean`        |           -            | `true` `false`                                                                              |   `false`   | To set the button as disabled                     |
| `variant`                             | `ButtonVariants` |           -            | `contained` `outlined` `text` `icon` `block` `back` `underlined`                            | `contained` | Set the button variants                           |
| `icon`                                | `ButtonIcon`     |           -            | `tick` `add` `locked` `view` `zoomIn` `zoomOut` `download` `print` `google` `close` `check` |
| `left` `back` `calender` `three-dots` | -                | To set the button icon |
| `size`                                | `ButtonSize`     |           -            | `small` `default` `medium`                                                                  |  `default`  | to set button size                                |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
