# Details Selector

## Description

A convenience directive for applying styling to detail selector component.

## Usage

### Default

```js
<app-details-selector></app-details-selector>
```

### With properties

```js
<app-details-selector
              [unselectedLabel]="'CONTENT.project_content_placeholder'"
              [selectedLabel]="'CONTENT.project_content_cvcontent'"
              [subject]="subject"
              [subjectItem]="subject.contents"
              [isLast]="last"
              [simpleSelector]="false"
              [variant]="subject.evaluationCriteria.length ? 'add' : 'locked'"
              (add)="openPrincipalView($event)"
              (deleteById)="openModalDelete($event)">
</app-details-selector>
```

## Properties

### Input

| Name              |     Type     | Required |                                  Values                                  | Default  | Description                                                                                                 |
| ----------------- | :----------: | :------: | :----------------------------------------------------------------------: | :------: | ----------------------------------------------------------------------------------------------------------- |
| `variant`         | `ButtonIcon` |    -     |                              `add` `locked`                              |    -     | To set different varaiants for details selector                                                             |
| `subject`         |  `Subject`   |    -     | `academicYear` `region` `evaluationCriteria` `contents` `customContents` |    -     | To set subject for details selector                                                                         |
| `subjectItem`     |    `any`     |    -     |                    `name` `dimensions` `basicSkills`                     |    -     | To set items for details selector, and subjectItem is an object which contains the given values as its keys |
| `buttonLabel`     |   `string`   |    -     |                                    -                                     | `Añadir` | To set button label for details selector                                                                    |
| `isLast`          |  `boolean`   |    -     |                                    -                                     | `false`  | To enable last option for details selector                                                                  |
| `loading`         |  `boolean`   |    -     |                                    -                                     | `false`  | To enable loading in details selector                                                                       |
| `unselectedLabel` |   `string`   |    -     |                                    -                                     |    -     | For setting an un-selected label for details selector                                                       |
| `selectedLabel`   |   `string`   |    -     |                                    -                                     |    -     | For setting an un-selected label for details selector     
| `simpleSelector`   |   `boolean`   |    -     |                      `true` `false`                                     |    `false`     | To set different layout                                                     |

### Output

| Name          | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `addCriteria` | Event emited from the details selector component while a criteria is added |
| `add`         | Event emited from the details selector component while adding              |
| `deleteById`  | Event emited from the details selector component while deleting by Id      |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
