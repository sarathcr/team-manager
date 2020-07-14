import { Injectable } from '@angular/core'

import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { BlockEntityService } from '../../store/entity/block/block-entity.service'

import { Option, DropdownCustom } from 'src/app/shared/constants/model/form-elements.model'
import { CompetencyModal } from '../../constants/model/principle-view.model'
import { Block } from '../../constants/model/curriculum.model'
import {
  PrincipalModalColData,
  TranslatePrincipalData,
  PrincipalModalColHead,
  GradeIndex
} from '../../constants/model/principle-view.model'
import { Grade, CriteriaWithSkills } from '../../constants/model/project.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

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
  subscriptions = new SubSink()
  grades: Grade[]

  constructor(
    private blockService: BlockEntityService,
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

  createTableData(block: Block, blockIndex: number): Block {
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
      const colThreeData = this.grades.find(grade => (grade.id === block.gradeId)).name
      const colFourData = `${blockIndex}. ${block.name}`
      const checked = this.criteriaIds.includes(criteria.id)

      return { ...criteria, checked, colOneData, colTwoData, colThreeData, colFourData }
    })
    return { ...block, evaluationCriteria, colOneHead: colOneHead?.value, colTwoHead: colTwoHead?.value, blockIndex }
  }

  getHeading(): void {
    this.modalColumns.colOneHead = { key: 'evaluationCriteria', value: this.heading.evaluationCriteria }
    this.modalColumns.colFourHead = { key: 'block', value: this.heading.block }
    this.modalColumns.colThreeHead = { key: 'course', value: this.heading.course }
  }

  getBlockData(): void {
    this.blockService.getWithQuery(
      { gradeIds: this.gradeIds.toString(), subjectId: String(this.subject.id) }
    )
  }

  createBlockData(data: Block[], gradeBlocks: GradeIndex[]): void {
    for (const block of data) {
      const gradeOfBlock = gradeBlocks.find(gradeBlock => gradeBlock.id === block.gradeId)
      if (block.subjectId === this.subject.id) {
        if (!this.blockData.some(blockData => blockData.id === block.id)) {
          this.blockData.push(this.createTableData(block, ++gradeOfBlock.count))
        }
      }
    }
  }

  getBlocks(selectedGrade: Grade): void {
    const gradeBlocks = this.gradeIds.map(id => ({ id, count: 0 }))
    this.subscriptions.sink = this.blockService.entities$
      .pipe(map(data => {
        this.createBlockData(data, gradeBlocks)
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
    this.subscriptions.unsubscribe()
    this.gradeIds = []
    this.criteriaIds = []
    this.blockData = []
    this.blocks = []
    this.modalColumns = {}
  }
}
