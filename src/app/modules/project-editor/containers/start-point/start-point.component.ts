import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { Country } from 'src/app/shared/constants/country.model';

import { FieldConfig } from '../../../../shared/form/models/field-config.interface';

import { CountryEntityService } from '../../services/country/country-entity.service';
import { RegionEntityService } from '../../services/region/region-entity.service';
import { AcademicYearEntityService } from '../../services/academic-year/academic-year-entity.service';
import { GradeEntityService } from '../../services/grade/grade-entity.service';
import { SubjectEntityService } from '../../services/subject/subject-entity.service';
import { RegionDataService } from '../../services/region/region-data.service';
import { GradeDataService } from '../../services/grade/grade-data.service';
import { SubjectDataService } from '../../services/subject/subject-data.service';
import { Region } from 'src/app/shared/constants/region.model';
import { AcademicYear } from 'src/app/shared/constants/academic-year.model';
import { Grade } from 'src/app/shared/constants/grade.model';
import { Subject } from 'src/app/shared/constants/subject.model';
import { Project } from 'src/app/shared/constants/project.model';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit {
  @Input() project: Project;
  @Output() statusUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  countries: Country[];
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
    name: 'country',
    id: 'country',
    placeholder: 'País',
    multiselect: false,
    options: [],
    selectedItems: []
  };
  regionDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Territorio',
    name: 'region',
    id: 'region',
    placeholder: 'Territorio',
    multiselect: false,
    options: [],
    selectedItems: []
  };
  academicYearDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Año académico',
    name: 'academicYear',
    id: 'academicYear',
    textField: 'academicYear',
    placeholder: 'Selecciona el año académico',
    multiselect: false,
    options: [],
    selectedItems: []
  };
  gradesDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Curso(s)',
    name: 'grades',
    id: 'grade',
    placeholder: 'Selecciona uno o más cursos',
    multiselect: true,
    options: [],
    selectedItems: []
  };
  subjectsDropdown: FieldConfig = {
    field: 'dropdown',
    label: 'Asignatura(s)',
    name: 'subjects',
    id: 'subject',
    placeholder: 'Selecciona una o más asignaturas',
    multiselect: true,
    options: [],
    selectedItems: []
  };
  constructor(
    private countryService: CountryEntityService,
    private regionService: RegionEntityService,
    private academicYearService: AcademicYearEntityService,
    private gradeService: GradeEntityService,
    private subjectService: SubjectEntityService,
    private regionDataService: RegionDataService,
    private gradesDataService: GradeDataService,
    private subjectsDataService: SubjectDataService
  ) { }

  ngOnInit(): void {
    this.getAllCountries()
  }

  getAllCountries() {
    this.countryService.getAll();
    this.countryService.entities$
    .subscribe( data => this.countryDropdown.options = data);
  }

  getRegions(selectedCountry) {
    const countryId = selectedCountry.val.filter(reg => reg.id).map(data => data.id)
    this.regionService.entities$
    .pipe(
      map(regions => regions.filter(region => region.country.id == countryId[0]))
    )
    .subscribe(newData => {
      if (!newData.length) this.regionService.getWithQuery(countryId) //trigger API after checking the store
      this.regionDropdown.options = newData
    })
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
  handleSubmit(event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    // this.buttonConfig.submitted = true;
    // this.buttonConfig.label = 'hencho';
    // this.statusUpdate.emit({id: 1, status: 'done'});
    // this.formSubmit.emit(this.stratPointForm.value);
  }
  formUpdate(res){
    // console.log(res)
    this.buttonConfig.disabled = false;
    if  (res.val.length) {
      switch (res.controller) {
        case 'country': {
          this.getRegions(res);
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
          this.statusUpdate.emit({id: 1, status: 'inprocess'});
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
          this.statusUpdate.emit({id: 1, status: 'inprocess'});
          break;
        }
        default: {
          this.getAllCountries();
          this.statusUpdate.emit({id: 1, status: 'inprocess'});
          break;
        }
      }
    }
  }
}

