import { Component, OnInit, HostListener } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'

import { Block, CriteriaWithSkills } from 'src/app/shared/constants/block.model'
import { BlockEntityService } from '../../store/entity/block/block-entity.service'

@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './competency-modal-content.component.html',
  styleUrls: ['./competency-modal-content.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CompetencyModalContentComponent implements OnInit {
  gradeDropdown: object
  rowHeadData: Array<object>
  rowData: Array<object>
  leftContentHeight = ''
  contentHeight = ''
  blocks: Block[]
  currentBlockIndex = 0
  checks: Array<{ parentId: number, count: number }> = []

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.adjustHeightContent()
  }

  constructor(
    public bsModalRef: BsModalRef,
    private translateService: TranslateService,
    private blockService: BlockEntityService
  ) { }

  ngOnInit(): void {
    this.adjustHeightContent()
    this.getTranslation()
    this.createFormConfig()
    this.getBlocks(String(1))
    this.rowInit()
    this.gradeDropdown = {
      field: 'dropdown',
      name: 'Curso',
      id: 'Curso',
      label: 'Curso',
      multiselect: true,
      options: [
        {
          id: 1,
          name: 'sample1'
        },
        {
          id: 2,
          name: 'sample2'
        }
      ],
      selectedItems: [{
        id: 1,
        name: 'sample1'
      }]
    }
  }

  onDropdownSelect(selectedData: any) {

  }

  getBlocks(gradeId) {
    this.blockService.getWithQuery({ gradeId, subjectId: String(1) }).subscribe(data => {
      this.blocks = data
    })
  }

  getTranslation(){
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
    ]).subscribe(translations => {})
  }

  createFormConfig() {
    this.gradeDropdown = {
      field: 'dropdown',
      name: 'Curso',
      id: 'curso',
      multiselect: false,
      options: [],
      selectedItems: [],
      placeholder: 'Selecciona un curso'
    }
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

  getStatus($event): void{
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
