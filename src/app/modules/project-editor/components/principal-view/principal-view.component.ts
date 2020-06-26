import { Component, OnInit, HostListener, OnDestroy } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'

import { DropDownConfig, Option } from 'src/app/shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

import { CriteriaWithSkills, Block } from 'src/app/shared/constants/block.model'
import { BlockEntityService } from '../../store/entity/block/block-entity.service'
import { map } from 'rxjs/operators'

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
  subjectId
  isShow = false
  tempHead: TempData = {
    evaluationCriteria: 'Criterio de evaluación',
    associatedCompetences: 'Competencias asociadas',
    course: 'Curso',
    block: 'Bloque',
    dimension: 'Dimensiones'
  }
  subscriptions = new SubSink()
  tableData: TempData[] = [
    {
      evaluationCriteria: 'Acceder a servicios de intercambio y publicación de información digital con criterios de'
      + 'seguridad y uso responsable.',
      associatedCompetences: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica',
      course: '4º ESO',
      block: '1. Tecnologías de la información y de la comunicación',
      dimension: 'Món actual, Salut i equilibri personal'
    },
    {
      evaluationCriteria: 'Acceder a servicios de intercambio y publicación de información digital con criterios de'
      + 'seguridad y uso responsable.',
      associatedCompetences: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica',
      course: '4º ESO',
      block: '1. Tecnologías de la información y de la comunicación',
      dimension: 'Món actual, Salut i equilibri personal'
    },
    {
      evaluationCriteria: 'Acceder a servicios de intercambio y publicación de información digital con criterios de'
      + 'seguridad y uso responsable.',
      associatedCompetences: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica',
      course: '4º ESO',
      block: '1. Tecnologías de la información y de la comunicación',
      dimension: 'Món actual, Salut i equilibri personal'
    },
    {
      evaluationCriteria: 'Acceder a servicios de intercambio y publicación de información digital con criterios de'
      + 'seguridad y uso responsable.',
      associatedCompetences: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica',
      course: '4º ESO',
      block: '1. Tecnologías de la información y de la comunicación',
      dimension: 'Món actual, Salut i equilibri personal'
    },
    {
      evaluationCriteria: 'Acceder a servicios de intercambio y publicación de información digital con criterios de'
      + 'seguridad y uso responsable.',
      associatedCompetences: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica',
      course: '4º ESO',
      block: '1. Tecnologías de la información y de la comunicación',
      dimension: 'Món actual, Salut i equilibri personal'
    }]


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

  getBlocks(selectedGrade: any): void {
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
        { gradeId: String(selectedGrade.id), subjectId: this.subjectId }
      )}
      this.blocks = data?.map(block => {
        let colOneHead: string
        let colTwoHead: string
        const evaluationCriteria = block.evaluationCriteria.map(criteria => {
          let colTwoData: string
          let colOneData: string
          if (!colOneHead && criteria.name) {
            colOneHead = 'Criterio de evaluación'
          }
          if (!colTwoHead) {
            if (criteria.dimensions?.length) {
              colTwoHead = 'Dimensions'
            }
            else if (criteria.basicSkills?.length) {
              colTwoHead = 'Basic Skills'
            }
          }
          colOneData = criteria.name
          if (criteria.dimensions?.length) {
            colTwoData = criteria.dimensions.map(({ name }) => name).join(', ')
          }
          else if (criteria.basicSkills?.length) {
            colTwoData = criteria.basicSkills.map(({ description }) => description).join(', ')
          }
          return { ...criteria, checked: false, colOneData, colTwoData, grade: selectedGrade, block }
        })
        return { ...block, evaluationCriteria, colOneHead, colTwoHead }
      })
    })
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

  getCelldata(criteria: CriteriaWithSkills): Array<{ list: string }> {
    return [
      { list: criteria.name },
      { list: criteria.basicSkills.join(', ') }
    ]
  }

  changeCurrentBlock(id: number): void {
    this.currentBlockIndex = id
  }

  adjustHeightContent(): void {
    const innerHeight: number = window.innerHeight
    this.contentHeight = (innerHeight * 61.73) / 100 + 'px'
    this.leftContentHeight = (innerHeight * 60.66) / 100 + 'px'
  }

  getSummary(): void {
    this.isShow = !this.isShow
  }
}

export interface TempData {
  evaluationCriteria?: string,
  associatedCompetences?: string,
  course?: string,
  block?: string,
  dimension?: string,
}
