# Excercises Card

## Description

A convenience directive for applying styling to a excercise card.

## Usage

### Default

```js
<app-exercises-card></app-exercises-card>
```

### With properties

```js
<app-exercises-card
  title="EXERCISES_CARD.exercises_card_title"
  subtitle="EXERCISES_CARD.exercises_card_subtitle"
  subtitleKey="EXERCISES_CARD.exercises_card_subtitle_key"
  subtitleValue="EXERCISES_CARD.exercises_card_subtitle_value"
  description="EXERCISES_CARD.exercises_card_description"
></app-exercises-card>
```

## Properties

### Input

| Name            | Type     | Required | Values |                                                          Default                                                          | Description                        |
| --------------- | -------- | :------: | ------ | :-----------------------------------------------------------------------------------------------------------------------: | ---------------------------------- |
| `title`         | `string` |    -     | -      |                                             `¿Cuánto sabes de la Edad Media?`                                             | To set title for element           |
| `subtitle`      | `string` |    -     | -      |                                                       `Calificable`                                                       | To set sub-title for element       |
| `subtitleKey`   | `string` |    -     | -      |                                                     `Entrega online:`                                                     | To set sub-title key for element   |
| `subtitleValue` | `string` |    -     | -      |                                                     `fecha pendiente`                                                     | To set sub-title value for element |
| `description`   | `string` |    -     |        | `Una vez visto el documental sobre la Edad media y habiendo realizado elpaseo virtual, contesta al siguiente formulario:` | To set description for element     |

### Output

| Name      | Description                                            |
| --------- | ------------------------------------------------------ |
| `options` | Event emited from the exercise card while click on options(3 dots) |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
