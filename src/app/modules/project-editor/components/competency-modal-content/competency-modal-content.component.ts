import { Component, OnInit, HostListener } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './competency-modal-content.component.html',
  styleUrls: ['./competency-modal-content.component.scss']
})
export class CompetencyModalContentComponent implements OnInit {
  gradeDropdown: object
  rowHeadData: Array<object>
  rowData: Array<object>
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
    this.getTranslation()
    this.createFormConfig()
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

  getTranslation(): void{
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

  createFormConfig(): void {
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

  rowInit(): void{
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

  openTab(event, id: string): void{
    let i
    let tabcontent
    let tablinks

    tabcontent = document.getElementsByClassName('custom-tab__content')
    for (i = 0 ; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('active')
    }

    tablinks = document.getElementsByClassName('custom-tab__links')
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active')
    }

    document.getElementById(id).classList.add('active')
    event.currentTarget.classList.add('active')
  }

  getStatus($event){
    console.log($event)
  }

  onDropdownSelect(event): void{}

  adjustHeightContent(): void{
    const innerHeight: number = window.innerHeight
    this.contentHeight = (innerHeight * 61.73) / 100 + 'px'
    this.leftContentHeight = (innerHeight * 60.66) / 100 + 'px'
  }
}
