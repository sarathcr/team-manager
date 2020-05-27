import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldConfig } from '../../../../shared/form/models/field-config.interface';
import { CountryEntityService } from '../../services/country/country-entity.service';
import { RegionEntityService } from '../../services/region/region-entity.service';
import { AcademicYearEntityService } from '../../services/academic-year/academic-year-entity.service';
import { GradeEntityService } from '../../services/grade/grade-entity.service';
import { SubjectEntityService } from '../../services/subject/subject-entity.service';
import { Project } from 'src/app/shared/constants/project.model';
import { formOneInitData } from '../../constants/step-forms.data';
import { FormOneInitData, FormOne, FormStatus } from '../../constants/step-forms.model';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  initialFormData: FormOneInitData = new formOneInitData
  status: 'inprogress' | 'done' | 'pending' = "pending"

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
    private subjectService: SubjectEntityService
  ) { }

  ngOnInit(): void {
    this.getAllCountries()
    this.formInIt()
  }

  formInIt() {
    if (this.project$)
      this.project$
        .subscribe(data => {
          let tempinitialFormData = new formOneInitData;
          if (data?.country) {
            this.countryDropdown.selectedItems.push({ ...data.country})
            tempinitialFormData.country.push({ ...data.country })
            this.getRegions(data.country.id)
          }
          if (data?.region) {
            this.regionDropdown.selectedItems.push({ ...data.region})
            tempinitialFormData.region.push({ ...data.region })
            this.getAcademicYears()
          }
          if (data?.academicYear) {
            this.academicYearDropdown.selectedItems.push({ ...data.academicYear})
            tempinitialFormData.academicYear.push({ ...data.academicYear})
            this.getGrades(data.academicYear.id, data.region.id)
            this.getSubjects(data.academicYear.id, data.region.id)
          }
          if (data?.grades) {
            this.gradesDropdown.selectedItems = []
            this.gradesDropdown.selectedItems.push(...data.grades)
            tempinitialFormData.grades.push({ ...data })
          }
          if (data?.subjects?.length) {
            this.subjectsDropdown.selectedItems = []
            this.subjectsDropdown.selectedItems.push(...data.subjects)
            tempinitialFormData.subjects.push({ ...data })
          }
          this.initialFormData = tempinitialFormData;
        })
  }

  getAllCountries() {
    this.countryService.getAll();
    this.countryService.entities$
      .subscribe(data => this.countryDropdown.options = data);
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

  getGrades(academicyearId: number, regionId?: number) {
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

  getSubjects(academicyearId: number, regionId?: number) {
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

  checkStatus() {
    if (this.countryDropdown.selectedItems.length &&
      this.regionDropdown.selectedItems.length &&
      this.academicYearDropdown.selectedItems.length &&
      this.gradesDropdown.selectedItems.length &&
      this.subjectsDropdown.selectedItems.length
      ) { this.status = "done" }
    if (!this.countryDropdown.selectedItems.length &&
      !this.regionDropdown.selectedItems.length &&
      !this.academicYearDropdown.selectedItems.length &&
      !this.gradesDropdown.selectedItems.length &&
      !this.subjectsDropdown.selectedItems.length
      ) { this.status = "pending" }
  }

  checkInProgress(data: any, type: string) {
    let values: Array<any> = [];
    for (var key of Object.keys(this.initialFormData)) {
      // let value: any;
      switch (key) {
        case 'country':
          values.push(this.isEqual(this.initialFormData.country, this.countryDropdown.selectedItems))
          break;
        case 'region':
          values.push(this.isEqual(this.initialFormData.region, this.regionDropdown.selectedItems))
          break;
        case 'academicYear':
          values.push(this.isEqual(this.initialFormData.academicYear, this.academicYearDropdown.selectedItems))
          break;
        case 'grades':
          values.push(this.isEqual(this.initialFormData.grades, this.gradesDropdown.selectedItems))
          break;
        default:
          values.push(this.isEqual(this.initialFormData.subjects, this.subjectsDropdown.selectedItems))
          break;
      }
    }
    console.log(values, "is equal")
    if (values.includes(false)) {
      this.status = 'inprogress'
    }
    this.inProgress.emit(this.status)
    this.buttonConfig.disabled = this.status !== 'inprogress'
  }

  onDropdownSelect(selectedData: any) {
    console.log(selectedData)
    this.checkInProgress(selectedData.val, selectedData.controller)
    const selectedId = selectedData.val[0]?.id;
    if (selectedData) {
      switch (selectedData.controller) {
        case 'country': {
          this.resetFromCountry()
          if (selectedId) this.getRegions(selectedId)
          break;
        }
        case 'region': {
          this.resetFromRegion()
          if (selectedId) this.getAcademicYears();
          break;
        }
        case 'academicYear': {
          this.resetFromAcademicYear()
          if (selectedId) {
            this.getGrades(selectedId);
            this.getSubjects(selectedId);
          }
          break;
        }
      }
      this.checkInProgress(selectedData.val, selectedData.controller)
    }
  }

  handleSubmit() {
    this.checkStatus();
    let formData: FormOne = {
      data: {
        country: this.countryDropdown.selectedItems[0] ? this.countryDropdown.selectedItems[0] : null,
        region: this.regionDropdown.selectedItems[0] ? this.regionDropdown.selectedItems[0] : null,
        academicYear: this.academicYearDropdown.selectedItems[0] ? this.academicYearDropdown.selectedItems[0] : null,
        grades: this.gradesDropdown.selectedItems,
        subjects : this.subjectsDropdown.selectedItems
      },
      status: this.status
    }
    console.log(formData, "formData ==!!")
    this.buttonConfig.submitted = this.status == 'done'
    this.buttonConfig.label = 'hecho'
    this.onSubmit.emit(formData)
  }

  resetFromCountry() {
    this.regionDropdown.selectedItems = []
    this.academicYearDropdown.selectedItems = []
    this.gradesDropdown.selectedItems = []
    this.subjectsDropdown.selectedItems = []
  }

  resetFromRegion() {
    this.academicYearDropdown.selectedItems = []
    this.gradesDropdown.selectedItems = []
    this.subjectsDropdown.selectedItems = []
  }

  resetFromAcademicYear() {
    this.gradesDropdown.selectedItems = []
    this.subjectsDropdown.selectedItems = []
  }

  isEqual(d1: any[], d2: any[]) {
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

}

