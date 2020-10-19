# Textarea

## Description

A convenience directive for applying styling to a textarea.

## Usage

### Default

```js
<app-textarea></app-textarea>
```

### With properties

```js
<app-textarea
 [placeholder] =" "
    [label]="label"
    [variant]="bullet"
    [size]="small"
    [enableValidator]="false"
    [helperText]="helperText"
    [maxLength]="20"
    [toggleData]=" "
    [initFocus]="false"
    [value]="value"
    [lineLimit]="0"
    [customClass]="mb-0"
    [background]="white"
    [errorText]="validation message here">
</app-textarea>
```

## Properties

### Input

| Name              | Type               | Required | Values               |  Default  | Description                                  |
| ----------------- | ------------------ | :------: | -------------------- | :-------: | -------------------------------------------- |
| `placeholder`     | `String`           |    -     | -                    |     -     | To set the placeholder of textarea component |
| `label`           | `String`           |    -     | -                    |     -     | Used to set the label                        |
| `helperText`      | `String`           |    -     | -                    |     -     | To set the helpertext for textareaComponent  |
| `errorText`       | `String`           |    -     | -                    |     -     | To display the validation message            |
| `maxLength`       | `Number`           |    -     | -                    |     -     | Maximum length of textareaComponent          |
| `size`            | `TextareaSize`     |    -     | -                    |  `small`  | To set the textarea size                     |
| `variant`         | `TextareaVariants` |    -     | `listitem` `default` | `default` | Set the textarea variants                    |
| `toggleData`      | `String`           |    -     | -                    |     -     | To set the toggled data                      |
| `initfocus`       | `boolean`          |    -     | -                    |  `false`  | it enable at the loading time                |
| `linelimit`       | `Number`           |    -     | -                    |    `0`    | Linelimit of textarea component              |
| `value`           | `string`           |    -     | -                    |     -     | To set the value                             |
| `enableValidator` | `boolean`          |    -     | -                    |  `false`  | Adjust validation for textarea component     |
| `customClass`     | `string`           |    -     | -                    |     -     | To add a custom class to textarea component  |
| `background`      | `string`           |    -     | `white` `white-lilac`|  `white`  | To set the background color of input label   |

### Output

| Name          | Description                              |
| ------------- | ---------------------------------------- |
| `inputChange` | Event emited from the textarea component |

### Validation

In this project, textarea field is used the ValidatorComponent.
The textarea used from ValidatorComponent are :

<ul>
<li>`value`</li>
<li>`maxlength`</li>
<li>`enableValidator`</li>
<li>`helperText`</li>
<li>`errorText`</li>
</ul>

[Click here to get more details about Validation props](?path=/info/shared-validator--default)

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
