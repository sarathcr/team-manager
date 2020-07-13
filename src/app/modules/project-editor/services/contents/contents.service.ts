import { Injectable } from '@angular/core'

import { map } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

import { BlockEntityService } from '../../store/entity/block/block-entity.service'

import { Grade, ContentModal, ContentsWithSkills } from 'src/app/modules/project-editor/constants/model/project.model'
import { PrincipalModalColData,
  PrincipalModalColHead,
  TranslatePrincipalData
} from '../../constants/model/principle-view.model'
import { Option, DropdownCustom } from 'src/app/shared/constants/model/form-elements.model'
import { Observable } from 'rxjs'
import { Block } from '../../constants/model/curriculum.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  loading$: Observable<boolean>
  subject: Option
  gradeIds: number[] = []
  heading: ContentModal
  blocks: Block[]
  blockData: Block[] = []
  contentIds: number[]
  modalColumns: PrincipalModalColData = {}
  currentBlockIndex = 0
  translateData: TranslatePrincipalData
  selectedGrades: Grade[]
  dropDownConfig: DropdownCustom
  subscriptions = new SubSink()

  constructor(
    private blockService: BlockEntityService,
    private translateService: TranslateService,
  ) { }

  changeColHead(colHead: PrincipalModalColHead, colName: string): void {
    if (!this.modalColumns[colName]) {
      this.modalColumns[colName] = colHead
    }
  }

  getTableData(content: ContentsWithSkills, colOneHead: PrincipalModalColHead): PrincipalModalColData {
    if (!colOneHead && content.name) {
      colOneHead = { key: 'contents', value: this.heading.contents }
    }
    return { colOneHead }
  }

  createTableData(block: Block, grade: Grade, blockIndex: number): Block {
    let colOneHead: PrincipalModalColHead
    const contents = block.contents.map( content => {
      const colOneData = content.name
      const { colOneHead: colOneHeadData } = this.getTableData(content, colOneHead )
      colOneHead = colOneHeadData
      const colThreeData = grade.name
      const colFourData = `${blockIndex}. ${block.name}`
      const checked = this.contentIds.includes(content.id)
      return { ...content, checked, colOneData, colThreeData, colFourData }
    })
    return { ...block, contents, colOneHead: colOneHead?.value || '', blockIndex }
  }

  getHeading(): void {
    this.heading = {
      contents: 'CONTENT.project_objectives_contentwindow_content',
      course: 'CONTENT.project_objectives_contentwindow_course',
      block: 'CONTENT.project_objectives_contentwindow_block',
    }
    this.modalColumns.colFourHead = { key: 'block', value: this.heading.block }
    this.modalColumns.colThreeHead = { key: 'course', value: this.heading.course }
    this.modalColumns.colOneHead = { key: 'contents', value: this.heading.contents }
  }

  getTranslationText(): void {
    this.translateData = {
      subjectTitle: 'CONTENT.project_content_contentwindow_curriculum',
      summaryTitle: 'CONTENT.project_objectives_contentwindow_content_selected_back',
      bodyTitle: 'CONTENT.project_content_contentwindow_title',
      countText: 'CONTENT.project_objectives_contentwindow_showall',
      addButton: 'CONTENT.project_objectives_contentwindow_add',
      selectedItem: 'CONTENT.project_objectives_contentwindow_content_selected',
      emptyTitle: 'CONTENT.project_content_contentwindow_empty_title',
      emptyDescription: 'CONTENT.project_content_contentwindow_empty_description',
      emptyButton: 'CONTENT.project_content_contentwindow_empty_button'
    }
  }
  getDropDownData(): void {
    this.subscriptions.sink = this.translateService.stream([
      'CONTENT.project_objectives_contentwindow_combo_title',
      'CONTENT.project_objectives_contentwindow_combo_section_1',
      'CONTENT.project_objectives_contentwindow_combo_section_2',
    ]).subscribe(translations => {
      this.dropDownConfig = {
        label: translations['CONTENT.project_objectives_contentwindow_combo_title'],
        priorityTitle: translations['CONTENT.project_objectives_contentwindow_combo_section_1'],
        normalTitle: translations['CONTENT.project_objectives_contentwindow_combo_section_2']
      }
    })
  }

  getBlockData(): void {
    this.blockService.getWithQuery(
      { gradeIds: this.gradeIds.toString(), subjectId: String(this.subject.id) }
    )
  }

  createBlockData(data: Block[], gradeBlocks: Array<{ id: number, count: number }>, selectedGrade: Grade): void {
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
    this.subscriptions.sink = this.blockService.entities$
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
    this.subscriptions.unsubscribe()
    this.gradeIds = []
    this.contentIds = []
    this.blockData = []
    this.blocks = []
    this.modalColumns = {}
  }
}
