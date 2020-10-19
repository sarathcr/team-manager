import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { BlockContentEntityService } from '../../store/entity/block-content/block-content-entity.service'

import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import {
  ContentModal,
  ContentsWithSkills,
  Grade,
} from 'src/app/modules/teacher/project-editor/constants/model/project.model'
import { Block } from '../../constants/model/curriculum.model'
import {
  PrincipalModalColData,
  PrincipalModalColHead,
} from '../../constants/model/principle-view.model'

import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  loading$: Observable<boolean>
  subject: Option
  gradeIds: number[] = []
  blockIds: number[] = []
  heading: ContentModal
  blocks: Block[]
  blockData: Block[] = []
  contentIds: number[]
  modalColumns: PrincipalModalColData = {}
  selectedGrades: Grade[]
  subscriptions = new SubSink()
  grades: Grade[]

  constructor(
    private blockContentService: BlockContentEntityService,
    private http: HttpClient
  ) {}

  changeColHead(colHead: PrincipalModalColHead, colName: string): void {
    if (!this.modalColumns[colName]) {
      this.modalColumns[colName] = colHead
    }
  }

  getTableData(
    content: ContentsWithSkills,
    colOneHead: PrincipalModalColHead
  ): PrincipalModalColData {
    if (!colOneHead && content.name) {
      colOneHead = { key: 'contents', value: this.heading.contents }
    }
    return { colOneHead }
  }

  createTableData(block: Block, blockIndex: number): Block {
    let colOneHead: PrincipalModalColHead
    const contents = block.contents.map((content) => {
      const colOneData = content.name
      const { colOneHead: colOneHeadData } = this.getTableData(
        content,
        colOneHead
      )
      colOneHead = colOneHeadData
      const colThreeData = this.grades.find(
        (grade) => grade.id === block.gradeId
      ).name
      const colFourData = `${blockIndex}. ${block.name}`
      const checked = this.contentIds.includes(content.id)
      return { ...content, checked, colOneData, colThreeData, colFourData }
    })
    return {
      ...block,
      contents,
      colOneHead: colOneHead?.value || '',
      blockIndex,
    }
  }

  getHeading(): void {
    this.modalColumns.colFourHead = { key: 'block', value: this.heading.block }
    this.modalColumns.colThreeHead = {
      key: 'course',
      value: this.heading.course,
    }
    this.modalColumns.colOneHead = {
      key: 'contents',
      value: this.heading.contents,
    }
  }

  getBlockData(query: string): void {
    if (this.gradeIds?.length) {
      this.blockContentService.getWithQuery(query)
    }
  }

  createBlockData(
    data: Block[],
    gradeBlocks: Array<{ id: number; count: number }>
  ): void {
    for (const block of data) {
      const gradeOfBlock = gradeBlocks.find(
        (gradeBlock) => gradeBlock.id === block.gradeId
      )
      if (block.subjectId === this.subject.id) {
        if (!this.blockData.some((blockData) => blockData.id === block.id)) {
          this.blockData.push(this.createTableData(block, ++gradeOfBlock.count))
        }
      }
    }
  }

  flattenArray(arr: any): [] {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten) ? this.flattenArray(toFlatten) : toFlatten
      )
    }, [])
  }

  getBlocks(selectedGrade: Grade): void {
    const gradeBlocks = this.gradeIds.map((id) => ({ id, count: 0 }))
    const queryString = `grade/list/${this.gradeIds}/subject/${this.subject.id}/block/${this.blockIds}/blocksContent`
    this.subscriptions.sink = this.blockContentService.entities$
      .pipe(
        map((data) => {
          const blockData = data.find((block) => block.id === queryString)
            ?.blocks
          const filteredData = this.flattenArray(
            gradeBlocks.map((gradeBlock) =>
              blockData?.filter((item) => item?.gradeId === gradeBlock.id)
            )
          )
          if (blockData) {
            this.createBlockData(filteredData, gradeBlocks)
          }
          return data.filter((blockContent) => blockContent.id === queryString)
        })
      )
      .subscribe((data) => {
        if (!data?.length) {
          this.getBlockData(queryString)
        } else {
          this.blocks = this.blockData?.filter(
            (block) => block.gradeId === selectedGrade.id
          )
          for (let blockData of this.blockData) {
            for (const block of this.blocks) {
              if (block.id === blockData.id) {
                blockData = block
              }
            }
          }
        }
        this.loading$ = this.blockContentService.loading$
      })
  }

  getGrades(params: any): Observable<Grade[]> {
    return this.http
      .get<Grade[]>(
        `${environment.apiUrl.curriculumService}/evaluationcriteria/${params.evaluationcriteriaIds}/grades`
      )
      .pipe(map((res) => res))
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
