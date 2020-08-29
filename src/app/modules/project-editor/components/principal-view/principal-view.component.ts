import { PlatformLocation } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'

import { ObjectiveService } from '../../services/objectives/objectives.service'

import {
  DropDownConfig,
  DropdownCustom,
  Option,
} from 'src/app/shared/constants/model/form-elements.model'
import { Block } from '../../constants/model/curriculum.model'
import {
  PrincipalModalColData,
  PrincipalViewLabels,
} from '../../constants/model/principle-view.model'
import { Subject } from '../../constants/model/project.model'
import { ContentService } from '../../services/contents/contents.service'

@Component({
  selector: 'app-principal-view-modal',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss'],
})
export class PrincipalViewComponent implements OnInit {
  @Input() modalColumns: PrincipalModalColData
  @Input() blockData: Block[]
  @Input() selectedGrades: Option[]
  @Input() dropdownTitles: DropdownCustom
  @Input() grades: Option[]
  @Input() stepId: 3 | 4
  @Input() labels: PrincipalViewLabels
  @Output() modalSubmit = new EventEmitter()
  @Output() decline = new EventEmitter()
  currentBlockIndex = 0
  gradeDropdownConfig: DropDownConfig
  showPrimaryView = true
  serviceData: ObjectiveService | ContentService
  subject: Subject

  constructor(
    public bsModalRef: BsModalRef,
    private location: PlatformLocation,
    private objectiveService: ObjectiveService,
    private contentService: ContentService
  ) {
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    switch (this.stepId) {
      case 3:
        this.serviceData = this.objectiveService
        break
      case 4:
        this.serviceData = this.contentService
        break
      default:
        this.serviceData = this.objectiveService
        break
    }
    this.createFormConfig()
  }

  createFormConfig(): void {
    if (this.serviceData?.subject) {
      this.subject = this.serviceData?.subject
    }
    const otherGrades = this.grades.filter(
      (grade) =>
        !this.selectedGrades.map((selected) => selected.id).includes(grade.id)
    )
    const selectedGrade = this.selectedGrades.length
      ? this.selectedGrades[0]
      : otherGrades[0]
    this.gradeDropdownConfig = {
      name: '',
      data: otherGrades,
      id: '',
      priorityData: this.selectedGrades,
      selectedItems: [selectedGrade],
      placeholder: this.dropdownTitles.placeholder,
      label: this.dropdownTitles.label,
      settings: {
        textField: 'name',
        singleSelection: true,
        priorityList: true,
        priorityTitle: this.dropdownTitles.priorityTitle,
        normalTitle: this.dropdownTitles.normalTitle,
        allowRemoteDataSearch: false,
        maxHeight: 225,
      },
      canDeselect: false,
    }
  }

  changeCurrentBlock(id: number): void {
    this.currentBlockIndex = id
  }

  togglePrimaryView(): void {
    this.showPrimaryView = !this.showPrimaryView
  }

  onDecline(): void {
    this.decline.emit()
  }

  handleButtonClick(): void {
    if (this.serviceData.blockData?.length) {
      const selectedItem = []
      for (const block of this.serviceData.blockData) {
        for (const item of block[this.modalColumns.colOneHead.key]) {
          if (item.checked === true) {
            selectedItem.push({ id: item.id, name: item.name })
          }
        }
      }
      this.modalSubmit.emit({ subject: this.subject, selectedItem })
    }
  }
}
