# Input

## Description

A convenience directive for applying styling to an Input component.

## Usage

### Default

```js
<app-input></app-input>
```

### With properties

```js
 <app-input [variant]="'email'"
            [label]="'label'"
            [placeholder]="'placeholder' | translate"
            [maxlength]="20"
            [initFocus]="false"
            [helperText]="'sample helperText'"
            [enableValidator]="false">
            [errorText]="'validation message here'"
            [error]="invalid"
            [maxDate]="''"
            [minDate]="''"
            [background]="background"
            (inputChange)="validateLogin($event, 'password')">
</app-input>
```

## Properties

### Input

| Name              |      Type      | Required |          Values           | Default | Description                                                             |
| ----------------- | :------------: | :------: | :-----------------------: | :-----: | ----------------------------------------------------------------------- |
| `variant`         | `InputVariant` |    -     | `text` `email` `password` `number` `date`  |    -    | Variants for input component                                            |
| `placeholder`     |       -        |    -     |             -             |    -    | Placeholder for input component                                         |
| `label`           |    `string`    |    -     |             -             |    -    | To set the label for input component                                    |
| `value`           |    `string`    |    -     |             -             |    -    | To set the value for input component                                    |
| `maxlength`       |    `number`    |    -     |             -             |    -    | To set the maximum length for the text to be written in input component |
| `initFocus`       |       -        |    -     |             -             | `false` | Adjust focus on input component(It enable at the time of loading)       |
| `enableValidator` |       -        |    -     |             -             | `false` | To enable validation for Input component                                |
| `error`           |       -        |    -     |             -             |    -    | To trigger the error text validator for input                           |
| `background`      |    `string`    |    -     |   `white` `white-lilac`   | `white` | To set the background color of input label                              |
minDate             |    `Date`      |    -     |             -             |     -   | To set min Date and validate it on date variant                                  |
maxDate             |    `Date`      |    -     |             -             |     -   | To set max Date and validate it on date variant                                  |

### Output

| Name          | Description                           |
| ------------- | ------------------------------------- |
| `inputChange` | Event emited from the input component |

### Validation

In this project, input field is used the ValidatorComponent.
The inputs used from ValidatorComponent are :

<ul>
<li>`value`</li>
<li>`maxlength`</li>
<li>`enableValidator`</li>
<li>`helperText`</li>
<li>`errorText`</li>
<li>`errorTrigger`</li>
</ul>

[Click here to get more details about Validation props](?path=/info/shared-validator--default)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
