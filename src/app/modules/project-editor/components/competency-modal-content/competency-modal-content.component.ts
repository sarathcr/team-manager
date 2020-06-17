import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FieldConfig } from '../../../../shared/constants/field.model'


@Component({
  selector: 'app-competency-modal-content',
  templateUrl: './competency-modal-content.component.html',
  styleUrls: ['./competency-modal-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetencyModalContentComponent implements OnInit {
  gradeDropdown: FieldConfig
  rowHeadData: Array<object>
  rowData: Array<object>
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.rowInit()
  }

  onDropdownSelect(selectedData: any) {

  }

  createFormConfig() {
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

  rowInit(){
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

  openTab(event, id: string){
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("custom-tab__content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('active');
    }

    tablinks = document.getElementsByClassName("custom-tab__links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }

    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
  }

}
