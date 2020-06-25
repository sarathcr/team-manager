import { Component, OnInit, HostListener, OnDestroy } from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'

import { DropDownConfig, Option } from 'src/app/shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'


@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './competency-modal-content.component.html',
  styleUrls: ['./competency-modal-content.component.scss']
})
export class CompetencyModalContentComponent implements OnInit, OnDestroy {
  gradeDropdownConfig: DropDownConfig
  rowHeadData: Array<object>
  rowData: Array<object>
  grades: Option[]
  selectedGrades: Option[]
  leftContentHeight = ''
  contentHeight = ''
  isShow = false
  tempHead: TempData = {
    evaluationCriteria: 'Criterio de evaluación',
    associatedCompetences: 'Competencias asociadas',
    course: 'Curso',
    block: 'Bloque',
    dimension: 'Dimensiones'
  }
  tempData: TempData[] = [
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
    },
    {
      evaluationCriteria: 'Acceder a servicios de intercambio y publicación de información digital con criterios de'
      + 'seguridad y uso responsable.',
      associatedCompetences: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica',
      course: '4º ESO',
      block: '1. Tecnologías de la información y de la comunicación',
      dimension: 'Món actual, Salut i equilibri personal'
    }
  ]
  subscriptions = new SubSink()

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustHeightContent()
  }

  constructor(
    public bsModalRef: BsModalRef,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.adjustHeightContent()
    this.createFormConfig()
    this.getTranslation()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
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

  openTab(event: any, id: string): void{
    let i
    let tabcontent
    let tablinks

    tabcontent = document.getElementsByClassName('custom-tab__content')
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('active')
    }

    tablinks = document.getElementsByClassName('custom-tab__links')
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active')
    }

    document.getElementById(id).classList.add('active')
    event.currentTarget.classList.add('active')
  }

  getStatus($event: any): void {
    console.log($event)
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
