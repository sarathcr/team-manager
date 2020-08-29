# Dropdown

## Description

A convenience directive for applying styling to an dropdown component.

## Usage

### Default

```js
<app-dropdown></app-dropdown>
```

### With properties

```js
<app-dropdown
        [config]='countryDropdown'
        [data$]='country$'
        label="STARTING_POINT.project_startingpoint_country"
        placeholder="STARTING_POINT.project_startingpoint_country_placeholder"
        (dropdownSelect)='onDropdownSelect($event)'>
</app-dropdown>
```

## Properties

### Input

| Name             |       Type       | Required |                                                             Values                                                             | Default | Description                                          |
| ---------------- | :--------------: | :------: | :----------------------------------------------------------------------------------------------------------------------------: | :-----: | ---------------------------------------------------- |
| `config`         | `DropDownConfig` |    -     | `id` `label` `name` `placeholder` `disabled` `loading` `data` `priorityData` `selectedItems` `settings` `canDeselect` `status` |    -    | To set configuration for dropdown component          |
| `data$`          |      `any`       |    -     |                                                               -                                                                |    -    | An observable for dropdown component                 |
| `placeholder`    |     `string`     |    -     |                                                               -                                                                |    -    | To set placeholder of dropdown component             |
| `label`          |     `string`     |    -     |                                                               -                                                                |    -    | To set the label for dropdown component              |
| `canDeselect`    |    `boolean`     |    -     |                                                               -                                                                | `true`  | To enable de-selection option for dropdown component |
| `getInitialData` |    `boolean`     |    -     |                                                               -                                                                |    -    | To enable the property to get initial data           |

### Output

| Name             | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `dropdownSelect` | Event emited from the dropdown component to get selected items |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
