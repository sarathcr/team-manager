import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  status='';
  items: object[];
  constructor(private translate :TranslateService) { }

  ngOnInit(): void {
    // localization for step menu
    this.translate.stream(
      [
        'STEPS_MENU.project_structure_stepsmenu_startingpoint',
        'STEPS_MENU.project_structure_stepsmenu_topic',
        'STEPS_MENU.project_structure_stepsmenu_creativetitle',
        'STEPS_MENU.project_stepsmenu_drivingquestion',
        'STEPS_MENU.project_structure_stepsmenu_finalproduct',
        'STEPS_MENU.project_structure_stepsmenu_sinopsis',
      ]
      ).subscribe(
      translations => {
       this.items=[
            {id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint']},
            {id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic']},
            {id: 3, name:'Objetivos competenciales'}, // add localization
            {id: 4, name:'Contenidos'}, // add localization
            {id: 5, name:'Evaluación'}, // add localization
            {id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle']},
            {id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion']},
            {id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct']},
            {id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis']},
            {id: 10, name:'Interacción con alumnos'} // add localization
          ];
      }
   );
  }


}
