# Secondary view

## Description

A convenience directive for applying styling to a secondary view.

## Usage

### Default

```js
<app-secondary-view>
</app-secondary-view>
```

### With properties

```js
 <app-secondary-view
      [heading]="heading"
      [blockData]="blockData"
      [modalColumns]="modalColumns"
      [labels]="secondaryViewLabels"
      (getPrimary)="toggleModalStandards()"
    ></app-secondary-view>
```

## Properties

### Input

| Name              | Type               | Required | Values               |  Default  | Description                                  |
| ----------------- | ------------------ | :------: | -------------------- | :-------: | -------------------------------------------- |
| ` blockData`     | `object`           |    -     | -                    |     -     | To set the data for secondary view|
| `CompetencyModal`           | `CompetencyModal`           |    -     | `evaluationCriteria`, `basicSkills` , `course` , `block` , `dimension` , `checked`, `standard` , `subject` | -|Used to display the data and checkbox                         |
| `modalColumns`      | `PrincipalModalColData` |    -     |`colOneHead`,`colTwoHead`,`colThreeHead`,`colFourHead`,`colOneData`, `colTwoData`, `colThreeData`, `colFourData`, | -|To set the heading and data of coloumns |
| `translateData`  |`TranslatePrincipalData`           |    -     |      `subjectTitle`,`summaryTitle`,`bodyTitle`,`countText`,`addButton`,`selectedItem`,`emptyTitle`,`emptyDescription``emptyButton`        |-     |  To set the trannslate principle data  | 
| `labels`       | `SecondaryViewLabels`   |    -     |  `selectedItemText``emptyTitle`, `emptyDescription`, `emptyButtonText` |     -     | To set the labels for button, title,description and text of selected item         |

### Output

| Name          | Description                              |
| ------------- | ---------------------------------------- |
| `getPrimary` | Event emited from the Secondary-view component |

## Note

This document is written based on implemented features, in future it may varry depends on new implemetations.
