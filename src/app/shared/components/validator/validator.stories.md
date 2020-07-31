# Validator

## Description

A convenience directive for applying validations to other components.

## Usage

### Default

```js
<app-validator></app-validator>
```

### With properties

```js
	<app-validator
			[helperText]="helperText"
			[errorText]="errorText"
			[value]="titleInput.value"
			[maxlength]="maxlength"
			[isEnabled]="enableValidator"
			[variant]="
			variant === 'password' || variant === 'email' ? 'text' : 'counter'
			[error]="error"
			#validator
		></app-validator>
```

## Properties

### Input

| Name           | Type     | Required |  Values           |  Default  | Description                                 |
| -------------- | -------- | :------: | :---------------: | :-------: | ------------------------------------------- |
| `variant`      | -        |    -     | `counter`, `text` | `counter` | Variants for validator component            |
| `value`        | `string` |    -     |     -             |     -     | To set the value for the validator          |
| `maxlength`    | -        |    -     |     -             |   `70`    | To set the maximum length for the validator |
| `isEnabled`    | -        |    -     |     -             |  `true`   | To enable validation to a component         |
| `helperText`   | `string` |    -     |     -             |     -     | To set helper text for the validator        |
| `errorText`    | `string` |    -     |     -             |     -     | To set error text for the validator         |
| `error`        | `boolean`|    -     |     -             |  `false`  | To set error trigger for the validator      |

## Note

In this documentation ,we used InputComponent for getting more detailed view about validation.
This document is written based on implemented features, in future it may varry depends on new implemetations.
