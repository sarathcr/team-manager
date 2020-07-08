import { Injectable } from '@angular/core'

import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'

import { BlockEntityService } from '../../store/entity/block/block-entity.service'

import { PrincipalModalColData, TranslatePrincipalData, GradeIndex, PrincipalModalColHead } from '../../constants/modal-table.data'
import { CompetencyModal } from '../../constants/competency-modal.data'
import { Grade } from '../../constants/project.model'
import { Option, DropdownCustom } from 'src/app/shared/constants/field.model'
import { Block, CriteriaWithSkills } from 'src/app/shared/constants/block.model'

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {
  loading$: Observable<boolean>
  subject: Option
  gradeIds: number[] = []
  heading: CompetencyModal
  blocks: Block[]
  blockData: Block[] = []
  criteriaIds: number[]
  modalColumns: PrincipalModalColData = {}
  currentBlockIndex = 0
  translateData: TranslatePrincipalData
  dropDownConfig: DropdownCustom
  selectedGrades: Grade[]

  constructor(
    private blockService: BlockEntityService,
    private translateService: TranslateService,
  ) { }

  changeColHead(colHead: PrincipalModalColHead, colName: string): void {
    if (!this.modalColumns[colName]) {
      this.modalColumns[colName] = colHead
    }
  }

  getTableData(
    criteria: CriteriaWithSkills,
    colOneHead: PrincipalModalColHead,
    colTwoHead: PrincipalModalColHead
  ): PrincipalModalColData {
    let colTwoData = ''
    if (!colOneHead && criteria.name) {
      colOneHead = { key: 'evaluationCriteria', value: this.heading.evaluationCriteria }
      this.changeColHead(colOneHead, 'colOneHead')
    }

    if (!colTwoHead) {
      if (criteria.dimensions?.length) {
        colTwoHead = { key: 'dimensions', value: this.heading.dimension }
        this.changeColHead(colTwoHead, 'colTwoHead')
      }
      else if (criteria.basicSkills?.length) {
        colTwoHead = { key: 'basicSkills', value: this.heading.basicSkills }
        this.changeColHead(colTwoHead, 'colTwoHead')
      }
    }
    if (this.modalColumns?.colTwoHead?.key) {
      colTwoData = criteria[this.modalColumns.colTwoHead.key]?.map(({ name }) => name).join(', ')
    }

    return { colTwoData, colOneHead, colTwoHead }
  }

  createTableData(block: Block, grade: Grade, blockIndex: number): Block {
    let colOneHead: PrincipalModalColHead
    let colTwoHead: PrincipalModalColHead
    const evaluationCriteria = block.evaluationCriteria.map(criteria => {
      const colOneData = criteria.name
      const {
        colOneHead: colOneHeadData,
        colTwoData,
        colTwoHead: colTwoHeadData
      } = this.getTableData(criteria, colOneHead, colTwoHead)
      colOneHead = colOneHeadData
      colTwoHead = colTwoHeadData
      const colThreeData = grade.name
      const colFourData = `${blockIndex}. ${block.name}`
      const checked = this.criteriaIds.includes(criteria.id)

      return { ...criteria, checked, colOneData, colTwoData, colThreeData, colFourData }
    })
    return { ...block, evaluationCriteria, colOneHead: colOneHead?.value, colTwoHead: colTwoHead?.value, blockIndex }
  }

  getHeading(): void {
    this.heading = {
      evaluationCriteria: 'OBJECTIVES.project_objectives_criteriawindow_criterion',
      basicSkills: 'OBJECTIVES.project_objectives_criteriawindow_basic_skills',
      course: 'OBJECTIVES.project_objectives_criteriawindow_grade',
      block: 'OBJECTIVES.project_objectives_criteriawindow_block',
      dimension: 'OBJECTIVES.project_objectives_criteriawindow_dimensions'
    }
    this.modalColumns.colThreeHead = { key: 'course', value: this.heading.course }
    this.modalColumns.colFourHead = { key: 'block', value: this.heading.block }
  }

  getTranslationText(): void {
    this.translateData = {
      subjectTitle: 'OBJECTIVES.project_objectives_criteriawindow_curriculum',
      summaryTitle: 'CONTENT.project_objectives_contentwindow_content_selected_back',
      bodyTitle: 'OBJECTIVES.project_objectives_criteriawindow_title',
      countText: 'OBJECTIVES.project_objectives_criteriawindow_showall',
      addButton: 'OBJECTIVES.project_objectives_criteriawindow_add',
      selectedItem: 'OBJECTIVES.project_objectives_criteriawindow_critera_selected',
      emptyTitle: 'OBJECTIVES.project_objectives_criteriawindow_empty_title',
      emptyDescription: 'OBJECTIVES.project_objectives_criteriawindow_empty_description',
      emptyButton: 'OBJECTIVES.project_objectives_criteriawindow_empty_button'
    }
  }

  getBlockData(): void {
    this.blockService.getWithQuery(
      { gradeIds: this.gradeIds.toString(), subjectId: String(this.subject.id) }
    )
  }

  getDropDownData(): void {
    this.translateService.stream([
      'OBJECTIVES.project_objectives_criteriawindow_combo_title',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_1',
      'OBJECTIVES.project_objectives_criteriawindow_combo_section_2',
    ]).subscribe(translations => {
      this.dropDownConfig = {
        label: translations['OBJECTIVES.project_objectives_criteriawindow_combo_title'],
        priorityTitle: translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_1'],
        normalTitle: translations['OBJECTIVES.project_objectives_criteriawindow_combo_section_2']
      }
    })
  }

  createBlockData(data: Block[], gradeBlocks: GradeIndex[], selectedGrade: Grade): void {
    for (const block of data) {
      const gradeOfBlock = gradeBlocks.find(gradeBlock => gradeBlock.id === block.gradeId)
      if (block.subjectId === this.subject.id) {
        if (!this.blockData.some(blockData => blockData.id === block.id)) {
          this.blockData.push(this.createTableData(block, selectedGrade, ++gradeOfBlock.count))
        }
      }
    }
  }

  getBlocks(selectedGrade: Grade): void {
    const gradeBlocks = this.gradeIds.map(id => ({id, count: 0}))
    this.blockService.entities$
      .pipe(map(data => {
        this.createBlockData(data, gradeBlocks, selectedGrade)
        return data.filter(block => block.subjectId === this.subject.id && this.gradeIds.includes(block.gradeId))
      }))
      .subscribe(data => {
        if (!data?.length) {
          this.getBlockData()
        }
        else {
          this.blocks = this.blockData?.filter(block => block.gradeId === selectedGrade.id)
          for (let blockData of this.blockData) {
            for (const block of this.blocks) {
              if (block.id === blockData.id) {
                blockData = block
              }
            }
          }
        }
        this.loading$ = this.blockService.loading$
      })
  }

  resetData(): void {
    this.gradeIds = []
    this.criteriaIds = []
    this.blockData = []
    this.blocks = []
    this.modalColumns = {}
  }
}
