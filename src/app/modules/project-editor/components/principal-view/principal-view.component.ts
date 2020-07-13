import { Component, OnInit } from '@angular/core'
import { PlatformLocation } from '@angular/common'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { Subject } from 'rxjs'

import { ObjectiveService } from '../../services/objectives/objectives.service'

import { Block } from '../../constants/model/curriculum.model'
import { PrincipalModalColData } from '../../constants/model/principle-view.model'
import { DropDownConfig, Option } from 'src/app/shared/constants/model/form-elements.model'
import { ContentService } from '../../services/contents/contents.service'

@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit {
  modalColumns: PrincipalModalColData
  blockData: Block[]
  currentBlockIndex = 0
  gradeDropdownConfig: DropDownConfig
  grades: Option[]
  showPrimaryView = true
  selectedItems: Subject<any> = new Subject()
  serviceData: ObjectiveService | ContentService
  stepId: 3 | 4

  constructor(
    public bsModalRef: BsModalRef,
    private location: PlatformLocation,
    private objectiveService: ObjectiveService,
    private contentService: ContentService
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
    this.getModalData()
  }

  getModalData(): void {
    this.modalColumns = this.serviceData.modalColumns
    this.blockData = this.serviceData.blockData
  }

  createFormConfig(): void {
    const selectedGrades = this.serviceData.selectedGrades
    const otherGrades = this.grades.filter(grade => !selectedGrades.map(selected => selected.id).includes(grade.id))
    this.gradeDropdownConfig = {
      name: '',
      data: otherGrades,
      id: '',
      priorityData: selectedGrades,
      selectedItems: [selectedGrades[0]],
      placeholder: 'Selecciona un curso',
      label: this.serviceData?.dropDownConfig?.label,
      settings: {
        textField: 'name',
        singleSelection: true,
        priorityList: true,
        priorityTitle: this.serviceData?.dropDownConfig?.priorityTitle,
        normalTitle: this.serviceData?.dropDownConfig?.normalTitle,
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
      this.selectedItems.next(selectedItem)
    }
    this.bsModalRef.hide()
  }

}
