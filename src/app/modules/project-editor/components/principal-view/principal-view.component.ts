import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { PlatformLocation } from '@angular/common'

import { BsModalRef } from 'ngx-bootstrap/modal'

import { ObjectiveService } from '../../services/objectives/objectives.service'

import { Block } from '../../constants/model/curriculum.model'
import { PrincipalModalColData } from '../../constants/model/principle-view.model'
import { DropDownConfig, Option, DropdownCustom } from 'src/app/shared/constants/model/form-config.model'
import { ContentService } from '../../services/contents/contents.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-principal-view-modal',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit {
  @Input() modalColumns: PrincipalModalColData
  @Input() blockData: Block[]
  @Input() selectedGrades: Option[]
  @Input() dropdownTitles: DropdownCustom
  currentBlockIndex = 0
  gradeDropdownConfig: DropDownConfig
  @Input() grades: Option[]
  showPrimaryView = true
  serviceData: ObjectiveService | ContentService
  @Input() stepId: 3 | 4
  @Output() modalSubmit = new EventEmitter()
  @Output() decline = new EventEmitter()

  constructor(
    public bsModalRef: BsModalRef,
    private location: PlatformLocation,
    private objectiveService: ObjectiveService,
    private contentService: ContentService,
    private translateService: TranslateService,
  ) {
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    switch (this.stepId){
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
    const otherGrades = this.grades.filter(grade =>
      !this.selectedGrades.map(selected => selected.id).includes(grade.id))
    this.gradeDropdownConfig = {
      name: '',
      data: otherGrades,
      id: '',
      priorityData: this.selectedGrades,
      selectedItems: [this.selectedGrades[0]],
      placeholder: this.dropdownTitles.placeholder,
      label: this.dropdownTitles.label,
      settings: {
        textField: 'name',
        singleSelection: true,
        priorityList: true,
        priorityTitle: this.dropdownTitles.priorityTitle,
        normalTitle: this.dropdownTitles.normalTitle,
        allowRemoteDataSearch: false,
        maxHeight: 225
      },
      canDeselect: false
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
    if (this.serviceData.blocks?.length) {
      const selectedItem = []
      for (const block of this.serviceData.blockData) {
        for (const item of block[this.modalColumns.colOneHead.key]) {
          if (item.checked === true) {
            selectedItem.push({ id: item.id, name: item.name })
          }
        }
      }
      this.modalSubmit.emit(selectedItem)
    }
  }
}
