import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
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
export class StartPointComponent implements OnInit, AfterViewInit {
  @Input() project: Project;
  @Output() statusUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  stratPointForm: FormGroup;
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
    this.stratPointForm = new FormGroup({
      country: new FormControl(null),
      region: new FormControl(null),
      academicYear: new FormControl(null),
      grades: new FormControl(null),
      subjects: new FormControl(null),
    });
    Object.keys(this.stratPointForm.controls).forEach(control => {
      this.stratPointForm.get(control).valueChanges.subscribe(val => {
        const modifiedVal = {
          controller: control,
          val
        }
        this.statusUpdate.emit(modifiedVal);
      });
    });
    this.getAllCountries();
    this.countries$ = this.countryService.entities$;
    // this.regions$ = this.regionService.entities$;
    // this.academicYears$ = this.academicYearService.entities$;
    // this.grades$ = this.gradeService.entities$;
    // this.subjects$ = this.subjectService.entities$;
    if(this.project){
      console.log(this.project)
      if (this.project.country) {
        this.countryDropdown.selectedItems = [{id: this.project.country.id, name: this.project.country.name}];
      }
      if (this.project.region) {
        this.regionDropdown.selectedItems = [{id: this.project.region?.id, name: this.project.region?.name}];
      }
      if (this.project.academicYear) {
        this.academicYearDropdown.selectedItems = [{id: this.project.academicYear?.id, name: this.project.academicYear?.academicYear}];
      }
      if (this.project.grades) {
        this.gradesDropdown.selectedItems.push(this.project.grades.map( grade => {grade.id, grade.name}))
      }
      if (this.project.subjects) {
        this.subjectsDropdown.selectedItems.push(this.project.subjects.map( subject => {subject.id, subject.name}))
      }
    }
  }
  ngAfterViewInit() {
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
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.buttonConfig.submitted = true;
    this.buttonConfig.label = 'hencho';
    this.statusUpdate.emit({id: 1, status: 'done'});
    this.formSubmit.emit(this.stratPointForm.value);
  }
  formUpdate(res){
    console.log(res)
    if  (res.val.length > 0) {
      this.buttonConfig.disabled = false;
      switch (res.controller) {
        case 'country': {
          this.countryId = res.val[0].id;
          this.regionDataService.setParam(this.countryId);
          this.getAllRegions();
          this.regions$ = this.regionService.entities$;
          this.regions$.subscribe(region => {
            console.log(region)
            this.regionDropdown.options = region.filter( item => item.country.id === this.countryId);
          });
          this.regionDropdown.disabled = false;
          this.statusUpdate.emit({id: 1, status: 'inprocess'});
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

