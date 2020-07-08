import { Component, OnInit, OnDestroy } from '@angular/core'
import { PlatformLocation } from '@angular/common'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { BlockEntityService } from '../../store/entity/block/block-entity.service'

import { EvaluationCriteria, Grade, CriteriaWithSkills } from '../../constants/model/project.model'
import { CompetencyModal } from '../../constants/model/principle-view.model'
import { ModalTable } from '../../constants/model/principle-view-table.model'
import { Block } from '../../constants/model/curriculum.model'
import { DropDownConfig, Option } from 'src/app/shared/constants/model/field.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit, OnDestroy {
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
  subject: Option
  showPrimaryView = true
  heading: CompetencyModal
  subscriptions = new SubSink()
  loading = false
  selectedCriterias: Subject<EvaluationCriteria[]> = new Subject()
  criteriaIds: number[]
  colOneHead: string
  colTwoHead: string
  blockData: Block[] = []
  gradeIds: number[]

  constructor(
    public bsModalRef: BsModalRef,
    private translateService: TranslateService,
    private blockService: BlockEntityService,
    private location: PlatformLocation
  ) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    this.getBlockData()
    this.heading = {
      evaluationCriteria: 'OBJECTIVES.project_objectives_criteriawindow_criterion',
      basicSkills: 'OBJECTIVES.project_objectives_criteriawindow_basic_skills',
      course: 'OBJECTIVES.project_objectives_criteriawindow_grade',
      block: 'OBJECTIVES.project_objectives_criteriawindow_block',
      dimension: 'OBJECTIVES.project_objectives_criteriawindow_dimensions'
    }
    this.createFormConfig()
    this.getBlocks(this.selectedGrades[0])
    this.getTranslation()
  }

  ngOnDestroy(): void {
    this.subject = null
    this.subscriptions.unsubscribe()
  }

  getBlockData(): void {
    this.blockService.getWithQuery(
      { gradeIds: this.gradeIds.toString(), subjectId: String(this.subject.id) }
    )
  }

  createFormConfig(): void {
    const selectedGrades = this.selectedGrades
    const otherGrades = this.grades.filter(grade => !selectedGrades.map(selected => selected.id).includes(grade.id))
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
        allowRemoteDataSearch: false,
        maxHeight: 225
      },
      canDeselect: false
    }
  }

  getTableData(criteria: CriteriaWithSkills, colOneHead: string, colTwoHead: string): ModalTable {
    let colTwoData: string
    if (!colOneHead && criteria.name) {
      colOneHead = this.heading.evaluationCriteria
    }
    if (!colTwoHead) {
      if (criteria.dimensions?.length) {
        colTwoHead = this.heading.dimension
        if (!this.colTwoHead) {
          this.colTwoHead = 'dimensions'
        }
      }
      else if (criteria.basicSkills?.length) {
        colTwoHead = this.heading.basicSkills
        if (!this.colTwoHead) {
          this.colTwoHead = 'basicSkills'
        }
      }
    }
    if (criteria.dimensions?.length) {
      colTwoData = criteria.dimensions.map(({ name }) => name).join(', ')
    }
    else if (criteria.basicSkills?.length) {
      colTwoData = criteria.basicSkills.map(({ name }) => name).join(', ')
    }

    return { colOneHead, colTwoHead, colTwoData }
  }

  createTableData(block: Block, grade: Grade, blockIndex: number): Block {
    let colOneHead: string
    let colTwoHead: string

    const evaluationCriteria = block.evaluationCriteria.map(criteria => {
      let colOneData: string
      const {
        colOneHead: colOneHeading,
        colTwoHead: colTwoHeading,
        colTwoData
      } = this.getTableData(criteria, colOneHead, colTwoHead)
      const checked = this.criteriaIds.includes(criteria.id)
      colOneHead = colOneHeading
      colTwoHead = colTwoHeading
      colOneData = criteria.name

      return { ...criteria, checked, colOneData, colTwoData, grade, block }
    })
    return { ...block, evaluationCriteria, colOneHead, colTwoHead, blockIndex }
  }

  getBlocks(selectedGrade: Grade): void {
    this.loading = true
    const gradeBlocks = this.gradeIds.map(id => ({id, count: 0}))
    this.subscriptions.sink = this.blockService.entities$
      .pipe(map(data => {
        for (const block of data) {
          const gradeOfBlock = gradeBlocks.find(gradeBlock => gradeBlock.id === block.gradeId)
          if (block.subjectId === this.subject.id) {
            if (!this.blockData.some(blockData => blockData.id === block.id)) {
              this.blockData.push(this.createTableData(block, selectedGrade, ++gradeOfBlock.count))
            }
          }
        }
        return true
      }))
      .subscribe(() => {
        this.blocks = this.blockData?.filter(block => block.gradeId === selectedGrade.id)

        for (let blockData of this.blockData) {
          for (const block of this.blocks) {
            if (block.id === blockData.id) {
              blockData = block
            }
          }
        }
      })
    this.changeCurrentBlock(0)
    this.blockService.loading$.subscribe(loading => { this.loading = loading })
  }

  getTranslation(): void {
    this.subscriptions.sink = this.translateService.stream([
      'OBJECTIVES.project_objectives_criteriawindow_combo_title',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_1',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_2',
    ]).subscribe(translations => {
      this.gradeDropdownConfig.label =
        translations['OBJECTIVES.project_objectives_criteriawindow_combo_title']
      this.gradeDropdownConfig.settings.priorityTitle =
        translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_1']
      this.gradeDropdownConfig.settings.normalTitle =
        translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_2']
    })
  }

  changeCurrentBlock(id: number): void {
    this.currentBlockIndex = id
  }

  togglePrimaryView(): void {
    this.showPrimaryView = !this.showPrimaryView
  }

  handleButtonClick(): void {
    if (this.blocks?.length) {
      const selectedCriteria = []
      for (const block of this.blockData) {
        for (const criteria of block.evaluationCriteria) {
          if (criteria.checked === true) {
            selectedCriteria.push({ id: criteria.id, name: criteria.name })
          }
        }
      }
      this.selectedCriterias.next(selectedCriteria)
    }
    this.bsModalRef.hide()
  }

}
