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

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit {
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

  formInIt() {
  }

  getAllCountries() {
    this.countryService.getAll();
    this.countryService.entities$
    .subscribe( data => this.countryDropdown.options = data);
  }

  getRegions(countryId: number) {
    this.regionService.entities$
    .pipe(
      map(regions => regions.filter(region => region.country.id == countryId))
    )
    .subscribe(newData => {
      if (!newData.length) this.regionService.getWithQuery(countryId.toString()) //trigger API after checking the store
      this.regionDropdown.options = newData
    })
  }

  getAcademicYears() {
    this.academicYearService.entities$
    .subscribe(newData => {
      if (!newData.length) this.academicYearService.getAll() //trigger API after checking the store
      this.academicYearDropdown.options = newData
    })
  }

  getAllGrades(academicyearId: number, regionId?: number) {
    const selectedRegionId = regionId ? regionId : this.regionDropdown.selectedItems[0].id;
    this.gradeService.entities$
    .pipe(
      map(grades => grades.filter(grade => grade.academicYear.id == academicyearId && grade.region.id == selectedRegionId))
    )
    .subscribe(newData => {
      if (!newData.length) this.gradeService.getWithQuery(`/regions/${selectedRegionId}/academicyears/${academicyearId}/grades`) //trigger API after checking the store
      this.gradesDropdown.options = newData
    });
  }

  getAllSubjects(academicyearId: number, regionId?: number) {
    const selectedRegionId = regionId ? regionId : this.regionDropdown.selectedItems[0].id;
    this.subjectService.entities$
    .pipe(
      map(subjects => subjects.filter(subject => subject.academicYear.id == academicyearId && subject.region.id == selectedRegionId))
    )
    .subscribe(newData => {
      if (!newData.length) this.subjectService.getWithQuery(`/regions/${selectedRegionId}/academicyears/${academicyearId}/subjects`) //trigger API after checking the store
      this.subjectsDropdown.options = newData
    });
  }

  handleSubmit(event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    // this.buttonConfig.submitted = true;
    // this.buttonConfig.label = 'hencho';
    // this.statusUpdate.emit({id: 1, status: 'done'});
    // this.formSubmit.emit(this.stratPointForm.value);
  }

  formUpdate(dropdownData: any){
    console.log(dropdownData)
    this.buttonConfig.disabled = false;
    const selectedId = dropdownData.val[0]?.id;
    if (dropdownData) {
      switch (dropdownData.controller) {
        case 'country': {
          let rest = ()=> {
            this.regionDropdown.selectedItems = [] // reset Regions
            this.academicYearDropdown.selectedItems = [] // reset Academic Year
            this.gradesDropdown.selectedItems = [] // reset Grade
            this.subjectsDropdown.selectedItems = [] // reset Subject
          }
          rest()
          if (selectedId) this.getRegions(selectedId)
          break;
        }
        case 'region': {
          let rest = ()=> {
            this.academicYearDropdown.selectedItems = [] 
            this.gradesDropdown.selectedItems = [] 
            this.subjectsDropdown.selectedItems = [] 
          }
          rest()
          if (selectedId) this.getAcademicYears();
          break;
        }
        case 'academicYear': {
          let rest = ()=> {
            this.gradesDropdown.selectedItems = []
            this.subjectsDropdown.selectedItems = []
          }
          rest()
          if (selectedId) {
            this.getAllGrades(selectedId);
            this.getAllSubjects(selectedId);
          }
          break;
        }
        default: {
          // this.getAllCountries();
          // this.statusUpdate.emit({id: 1, status: 'inprocess'});
          break;
        }
      }
    }
  }
}

