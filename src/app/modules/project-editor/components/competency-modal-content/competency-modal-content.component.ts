import { Component, OnInit, HostListener } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'
import { DropDownConfig, Option } from 'src/app/shared/constants/field.model'


@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './competency-modal-content.component.html',
  styleUrls: ['./competency-modal-content.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CompetencyModalContentComponent implements OnInit {
  gradeDropdownConfig: DropDownConfig
  rowHeadData: Array<object>
  rowData: Array<object>
  grades: Option[]
  selectedGrades: Option[]
  leftContentHeight = ''
  contentHeight = ''

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
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
    this.rowInit()

  }

  onDropdownSelect(selectedData: any) {

  }
  createFormConfig() {
    const selectedGrades = this.selectedGrades
    const otherGrades = this.grades.filter(x => selectedGrades.includes(x))
    console.log(selectedGrades,otherGrades)
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
      }
    }
  }
  getTranslation() {
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

  rowInit() {
    this.rowHeadData = [
      {
        list: 'Criterio de evaluación'
      },
      {
        list: 'Competencias asociadas'
      }
    ]
    this.rowData = [
      {
        list: 'Analizar los elementos y sistemas que configuran la comunicación alámbrica e inalámbrica.'
      },
      {
        list: 'Matemática y competencias básicas en ciencia y tecnología, Comunicación linguïstica'
      }
    ]
  }

  openTab(event, id: string) {
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

  getStatus($event) {
    console.log($event)
  }

  adjustHeightContent() {
    const innerHeight: number = window.innerHeight
    this.contentHeight = (innerHeight * 61.73) / 100 + 'px'
    this.leftContentHeight = (innerHeight * 60.66) / 100 + 'px'
  }

  configDropdownData() {

  }
}
