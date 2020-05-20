import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { FieldConfig } from '../../../../shared/form/models/field-config.interface';
import { FormComponent } from '../../../../shared/form/containers/form/form.component';
import { CountryEntityService } from '../../services/country-services/country-entity.service';
import { Country } from 'src/app/shared/constants/country.model';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit, AfterViewInit {
  @ViewChild(FormComponent) form: FormComponent;
  countries$: Observable<Country[]>;
  buttonConfig: FieldConfig = {
      label: 'MARCAR COMO HECHO',
      name: 'submit',
      field: 'button',
      disabled: true,
      submitted: false,
  };
  countryDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Pais',
    name: 'Pais',
    placeholder: 'País',
    multiselect: false,
    options: []
  };
  regionDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Territorio',
    name: 'Territorio',
    placeholder: '',
    multiselect: false,
    disabled: true,
    options: []
  };
  academicYearDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Año académico',
    name: 'Año académico',
    placeholder: 'Selecciona el año académico',
    multiselect: false,
    disabled: true,
    options: []
  };
  gradesDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Curso(s)',
    name: 'Curso',
    placeholder: 'Selecciona uno o más cursos',
    multiselect: true,
    disabled: true,
    options: []
  };
  subjectsDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Asignatura(s)',
    name: 'Asignatura',
    placeholder: 'Selecciona una o más asignaturas',
    multiselect: true,
    disabled: true,
    options: []
  };
  config: FieldConfig[] = [
    this.countryDropdown,
    this.regionDropdown,
    this.academicYearDropdown,
    this.gradesDropdown,
    this.subjectsDropdown,
    this.buttonConfig
  ];
  constructor(private countryService: CountryEntityService) { }

  ngOnInit(): void {
    this.getAllCountries();
    this.countries$ = this.countryService.entities$;

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
    this.countries$.subscribe(country => {
      this.countryDropdown.options = country;
      if (this.countryDropdown.options.length === 0){
        this.countryDropdown.options = [
          {id: 1, name: 'India'}
        ];
      }
      console.log(this.countryDropdown.options);
    });
  }
  getAllCountries() {
    // this.countries$ = this.countryService.entities$;
    // console.log(this.countries$)
    return this.countryService.getAll();
  }
  formSubmit(value: {[name: string]: any}) {
    // this.config.map( item => item.submitted = true);
    this.buttonConfig.submitted = true;
    this.buttonConfig.label = 'hencho';
  }
}

