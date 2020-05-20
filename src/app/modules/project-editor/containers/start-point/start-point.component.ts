import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { Country } from 'src/app/shared/constants/country.model';

import { FieldConfig } from '../../../../shared/form/models/field-config.interface';

import { FormComponent } from '../../../../shared/form/containers/form/form.component';

import { CountryEntityService } from '../../services/country/country-entity.service';
import { RegionEntityService } from '../../services/region/region-entity.service';
import { AcademicYearEntityService } from '../../services/academic-year/academic-year-entity.service';
import { GradeEntityService } from '../../services/grade/grade-entity.service';
import { SubjectEntityService } from '../../services/subject/subject-entity.service';
import { RegionDataService } from '../../services/region/region-data.service';
import { GradeDataService } from '../../services/grade/grade-data.service';
import { SubjectDataService } from '../../services/subject/subject-data.service';
import { Region } from 'src/app/shared/models/region.model';
import { AcademicYear } from 'src/app/shared/models/academic-year.model';
import { Grade } from 'src/app/shared/models/grade.model';
import { Subject } from 'src/app/shared/models/subject.model';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit, AfterViewInit {
  @Output() projectUpdate: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(FormComponent) form: FormComponent;
  countries$: Observable<Country[]>;
  regions$: Observable<Region[]>;
  academicYears$: Observable<AcademicYear[]>;
  grades$: Observable<Grade[]>;
  subjects$: Observable<Subject[]>;
  countryId: number;
  regionId: number;
  yearId: number;
  subjectId: number;
  buttonConfig: FieldConfig = {
      label: 'MARCAR COMO HECHO',
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
  };
  countryDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Pais',
    name: 'Pais',
    id: 'country',
    placeholder: 'País',
    multiselect: false,
    options: []
  };
  regionDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Territorio',
    name: 'Territorio',
    id: 'region',
    placeholder: '',
    multiselect: false,
    disabled: true,
    options: []
  };
  academicYearDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Año académico',
    name: 'Año académico',
    id: 'academicYear',
    textField: 'academicYear',
    placeholder: 'Selecciona el año académico',
    multiselect: false,
    disabled: true,
    options: []
  };
  gradesDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Curso(s)',
    name: 'Curso',
    id: 'grade',
    placeholder: 'Selecciona uno o más cursos',
    multiselect: true,
    disabled: true,
    options: []
  };
  subjectsDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Asignatura(s)',
    name: 'Asignatura',
    id: 'subject',
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
  constructor(private countryService: CountryEntityService,
              private regionService: RegionEntityService,
              private academicYearService: AcademicYearEntityService,
              private gradeService: GradeEntityService,
              private subjectService: SubjectEntityService,
              private regionDataService: RegionDataService,
              private gradesDataService: GradeDataService,
              private subjectsDataService: SubjectDataService
              ) { }

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
    });
  }
  getAllCountries() {
    return this.countryService.getAll();
  }
  getAllRegions() {
    return this.regionService.getAll();
  }
  getAllGrades() {
    return this.gradeService.getAll();
  }
  getAcademicYears() {
    return this.academicYearService.getAll();
  }
  getAllSubjects() {
    return this.subjectService.getAll();
  }
  formSubmit(value: {[name: string]: any}) {
    // this.config.map( item => item.submitted = true);
    this.buttonConfig.submitted = true;
    this.buttonConfig.label = 'hencho';
    this.projectUpdate.emit(value)
  }
  formUpdate(res){
    if  (res.val.length > 0) {
      this.buttonConfig.disabled = false;
      switch (res.controller) {
        case 'country': {
          this.countryId = res.val[0].id;
          this.regionDataService.setParam(this.countryId);
          this.getAllRegions();
          this.regions$ = this.regionService.entities$;
          this.regions$.subscribe(region => {
            this.regionDropdown.options = region;
          });
          this.regionDropdown.disabled = false;
          break;
        }
        case 'region': {
          this.regionId = res.val[0].id;
          this.getAcademicYears();
          this.academicYears$ = this.academicYearService.entities$;
          this.academicYears$.subscribe(year => {
            this.academicYearDropdown.options = year;
          });
          this.academicYearDropdown.disabled = false;
          break;
        }
        case 'academicYear': {
          this.yearId = res.val[0].id;
          this.gradesDataService.setParam(this.regionId, this.yearId);
          this.getAllGrades();
          this.grades$ = this.gradeService.entities$;
          this.grades$.subscribe(grade => {
            this.gradesDropdown.options = grade;
          });
          this.gradesDropdown.disabled = false;
          this.subjectsDataService.setParam(this.regionId, this.yearId);
          this.getAllSubjects();
          this.subjects$ = this.subjectService.entities$;
          this.subjects$.subscribe(subject => {
            this.subjectsDropdown.options = subject;
          });
          this.subjectsDropdown.disabled = false;
          break;
        }
        default: {
          this.getAllCountries();
          break;
        }
      }
    }
  }
}

