import { Component, OnInit, OnDestroy } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Subject } from 'rxjs'

import { DropDownConfig, Option } from 'src/app/shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

import { CriteriaWithSkills, Block } from 'src/app/shared/constants/block.model'
import { BlockEntityService } from '../../store/entity/block/block-entity.service'
import { EvaluationCriteria, Grade } from '../../constants/project.model'

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
  subjectId: number
  isShow = false
  heading: TempData
  subscriptions = new SubSink()
  loading = false
  selectedCriterias: Subject<EvaluationCriteria[]> = new Subject()
  criterias: number[]
  colOneHead: string
  colTwoHead: string

  constructor(
    public bsModalRef: BsModalRef,
    private translateService: TranslateService,
    private blockService: BlockEntityService
  ) { }

  ngOnInit(): void {
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
    this.subjectId = null
    this.subscriptions.unsubscribe()
  }

  onDropdownSelect(selectedData: any): void {
    this.getBlocks(selectedData.val[0])
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
        allowRemoteDataSearch: false
      }
    }
  }

  getData(criteria: CriteriaWithSkills, colOneHead: string, colTwoHead: string):
    { colOneHead: string, colTwoHead: string, colTwoData: string } {
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
      colTwoData = criteria.basicSkills.map(({ description }) => description).join(', ')
    }
    return { colOneHead, colTwoHead, colTwoData }
  }

  createTableData(block: Block, grade: Grade): Block {
    let colOneHead: string
    let colTwoHead: string

    const evaluationCriteria = block.evaluationCriteria.map(criteria => {
      let colOneData: string
      const {
        colOneHead: colOneHeading,
        colTwoHead: colTwoHeading,
        colTwoData
      } = this.getData(criteria, colOneHead, colTwoHead)
      const checked = this.criterias.includes(criteria.id)
      colOneHead = colOneHeading
      colTwoHead = colTwoHeading
      colOneData = criteria.name

      return { ...criteria, checked, colOneData, colTwoData, grade, block }
    })

    return { ...block, evaluationCriteria, colOneHead, colTwoHead }
  }

  getBlocks(selectedGrade: any): void {
    this.loading = true
    this.subscriptions.sink = this.blockService.entities$
      .pipe(map(data => {
        const savedBlockData = data.find(blockData => blockData.id === `${selectedGrade.id}-${this.subjectId}`)
        if (savedBlockData?.blockData) {
          return savedBlockData.blockData
        }
      }))
      .subscribe(data => {
        if (!data?.length) {
          this.blockService.getWithQuery(
            { gradeId: String(selectedGrade.id), subjectId: String(this.subjectId) }
          )
        }
        this.blocks = data?.map(block => {
          return this.createTableData(block, selectedGrade)
        })
      })
    this.blockService.loading$.subscribe(loading => { this.loading = loading })
  }

  getTranslation(): void {
    this.subscriptions.sink = this.translateService.stream([
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

  changeCurrentBlock(id: number): void {
    this.currentBlockIndex = id
  }

  getSummary(): void {
    this.isShow = !this.isShow
  }

  handleButtonClick(): void {
    if (this.blocks?.length) {
      const selectedCriteria = []
      for (const block of this.blocks) {
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

export interface TempData {
  evaluationCriteria?: string,
  basicSkills?: string,
  course?: string,
  block?: string,
  dimension?: string,
  checked?: boolean
}
