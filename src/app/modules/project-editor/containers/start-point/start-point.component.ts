import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldConfig } from '../../../../shared/form/models/field-config.interface';
import { FormComponent } from '../../../../shared/form/containers/form/form.component';
import { CountryEntityService } from '../../services/country-services/country-entity.service';
import { Country } from 'src/app/shared/models/country.model';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit, AfterViewInit {
  @ViewChild(FormComponent) form: FormComponent;
  country$: Observable<Country[]>;
  buttonConfig: FieldConfig = {
      label: 'MARCAR COMO HECHO',
      name: 'submit',
      field: 'button',
      submitted: false,
  }
  config: FieldConfig[] = [
    {
      field: 'dropdown',
      label: 'Pais',
      name: 'Pais',
      placeholder: 'País',
      multiselect: false,
      options: [
        { id: 1, value: 'España' },
        { id: 2, value: 'India' },
        { id: 3, value: 'USA' },
        { id: 4, value: 'Portugal' },
        { id: 5, value: 'China' }
      ]
    },
    {
      field: 'dropdown',
      label: 'Territorio',
      name: 'Territorio',
      placeholder: '',
      multiselect: false,
      options: [
        { id: 1, value: 'Hanoi' },
        { id: 2, value: 'Lang Son' },
        { id: 3, value: 'Vung Tau' },
        { id: 4, value: 'Hue' },
        { id: 5, value: 'Cu Chi' }
      ]
    },
    {
      field: 'dropdown',
      label: 'Año académico',
      name: 'Año académico',
      placeholder: 'Selecciona el año académico',
      multiselect: false,
      options: [
        { id: 1, value: 'España' },
        { id: 2, value: 'India' },
        { id: 3, value: 'USA' },
        { id: 4, value: 'Portugal' },
        { id: 5, value: 'China' }
      ]
    },
    {
      field: 'dropdown',
      label: 'Curso(s)',
      name: 'Curso',
      placeholder: 'Selecciona uno o más cursos',
      multiselect: true,
      options: [
        { id: 1, value: 'Hanoi' },
        { id: 2, value: 'Lang Son' },
        { id: 3, value: 'Vung Tau' },
        { id: 4, value: 'Hue' },
        { id: 5, value: 'Cu Chi' }
      ]
    },
    {
      field: 'dropdown',
      label: 'Asignatura(s)',
      name: 'Asignatura',
      placeholder: 'Selecciona una o más asignaturas',
      multiselect: true,
      options: [
        { id: 1, value: 'España' },
        { id: 2, value: 'India' },
        { id: 3, value: 'USA' },
        { id: 4, value: 'Portugal' },
        { id: 5, value: 'China' }
      ]
    },
    this.buttonConfig
  ];
  constructor(private countryService: CountryEntityService) { }

  ngOnInit(): void {
    this.getCountryList();
  }
  ngAfterViewInit() {
    // let previousValid = this.form.valid;
    // this.form.changes.subscribe(() => {
    //   if (this.form.valid !== previousValid) {
    //     previousValid = this.form.valid;
    //     this.form.setDisabled('submit', !previousValid);
    //   }
    // });

    // this.form.setDisabled('submit', true);
    // this.form.setValue('name', 'Todd Motto');
  }
  getCountryList() {
    console.log('Hi')
    this.country$ = this.countryService.entities$;
    console.log(this.country$)
  }
  formSubmit(value: {[name: string]: any}) {
    // this.config.map( item => item.submitted = true);
    this.buttonConfig.submitted = true;
    this.buttonConfig.label = 'hencho';
  }
}

