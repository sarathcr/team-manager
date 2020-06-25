import { Component, OnInit, HostListener } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'
import { DropDownConfig, Option } from 'src/app/shared/constants/field.model'

import { Block, CriteriaWithSkills } from 'src/app/shared/constants/block.model'
import { BlockEntityService } from '../../store/entity/block/block-entity.service'

@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './competency-modal-content.component.html',
  styleUrls: ['./competency-modal-content.component.scss']
})
export class CompetencyModalContentComponent implements OnInit {
  gradeDropdownConfig: DropDownConfig
  rowHeadData: Array<object>
  rowData: Array<object>
  grades: Option[]
  selectedGrades: Option[]
  leftContentHeight = ''
  contentHeight = ''
  blocks: Block[]
  currentBlockIndex = 0
  checks: Array<{ parentId: number, count: number }> = []
  subjectId

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustHeightContent()
  }

  constructor(
    public bsModalRef: BsModalRef,
    private translateService: TranslateService,
    private blockService: BlockEntityService
  ) { }

  ngOnInit(): void {
    this.adjustHeightContent()
    this.createFormConfig()
    this.getBlocks()
    this.getTranslation()
    this.rowInit()
  }

  onDropdownSelect(selectedData: any): void { }

  createFormConfig(): void {
    const selectedGrades = this.selectedGrades
    const otherGrades = this.grades.filter(grade => selectedGrades.includes(grade))
    this.gradeDropdownConfig = {
      name: '',
      data: otherGrades,
      id: '',
      priorityData: selectedGrades,
      selectedItems: [selectedGrades[0]],
      placeholder: 'Selecciona un curso',
      settings: {
        textField: 'name',
        singleSelection: true,
        priorityList: true,
        priorityTitle: 'Cursos preferentes',
        normalTitle: 'Otros cursos',
        allowRemoteDataSearch: false
      }
    }
  }

  getBlocks(): void {
    this.blockService.getWithQuery(
      { gradeId: String(this.selectedGrades[0].id), subjectId: this.subjectId }
    ).subscribe(data => {
      this.blocks = data
    })
  }

  getTranslation(): void {
    this.translateService.stream([
      'OBJECTIVES.project_objectives_criteriawindow_curriculum',
      'OBJECTIVES.project_objectives_criteriawindow_title',
      'OBJECTIVES.project_objectives_criteriawindow_combo_title',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_1',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_2',
      'OBJECTIVES.project_objectives_criteriawindow_criterion',
      'OBJECTIVES.project_objectives_criteriawindow_basic_skills',
      'OBJECTIVES.project_objectives_criteriawindow_dimensions',
      'OBJECTIVES.project_objectives_criteriawindow_showall',
      'OBJECTIVES.project_objectives_criteriawindow_add',
    ]).subscribe(translations => {
      this.gradeDropdownConfig.label =
        translations['OBJECTIVES.project_objectives_criteriawindow_combo_title']
      // Below lines must be uncommented after getting its translation
      // this.gradeDropdownConfig.placeholder =
      // translations['OBJECTIVES.project_objectives_criteriawindow_combo_placeholder']
      this.gradeDropdownConfig.settings.priorityTitle =
        translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_1']
      this.gradeDropdownConfig.settings.normalTitle =
        translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_2']
    })
  }

  getCelldata(criteria: CriteriaWithSkills): Array<{ list: string }> {
    return [
      { list: criteria.name },
      { list: criteria.basicSkills.join(', ') }
    ]
  }

  rowInit(): void {
    this.rowHeadData = [
      {
        list: 'Criterio de evaluación'
      },
      {
        list: 'Competencias asociadas'
      }
    ]
  }

  changeCurrentBlock(id: number): void {
    this.currentBlockIndex = id
  }

  getStatus($event: { parentID: number, checked: number }): void{
    const parentId = $event.parentID
    const parent = this.checks.find(check => check.parentId === parentId)
    if (parent) {
      parent.count = parent.count + ($event.checked ? 1 : -1)
    }
    else {
      this.checks.push({ parentId, count: 1 })
    }
  }

  adjustHeightContent(): void{
    const innerHeight: number = window.innerHeight
    this.contentHeight = (innerHeight * 61.73) / 100 + 'px'
    this.leftContentHeight = (innerHeight * 60.66) / 100 + 'px'
  }

}
