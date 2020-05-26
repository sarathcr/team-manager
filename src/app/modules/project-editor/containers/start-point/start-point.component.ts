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
import { stepForm1, stepForm1InitData } from '../../constants/step-forms.data';
import { StepForm1InitData } from '../../constants/step-forms.model';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.scss']
})
export class StartPointComponent implements OnInit {
  @Output() inProgress: EventEmitter<any> = new EventEmitter<any>()
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>()
  @Input() project$: Observable<Project>
  initialFormData: StepForm1InitData
  updatedForm: StepForm1InitData
  isInpsogress: boolean = false
  isDone: boolean = true

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
          this.initialFormData = new stepForm1InitData;
          if (data?.country?.id) {
            this.countryDropdown.selectedItems.push({ ...data.country })
            this.initialFormData.country.push({ ...data.country })
            this.getRegions(data.country.id)
          }
          if (data?.region?.id) {
            this.regionDropdown.selectedItems.push({ ...data.region })
            this.initialFormData.region.push({ ...data.region })
            this.getAcademicYears()
          }
          if (data?.academicYear?.id) {
            this.academicYearDropdown.selectedItems.push({ ...data.academicYear })
            this.initialFormData.academicYear.push({ ...data.academicYear })
            this.getGrades(data.academicYear.id, data.region.id)
            this.getSubjects(data.academicYear.id, data.region.id)
          }
          if (data?.grades?.length) {
            data.grades.forEach(data => {
              this.gradesDropdown.selectedItems.push({ ...data })
              this.initialFormData.grades.push({ ...data })
            })
          }
          if (data?.subjects?.length) {
            data.subjects.forEach(data => {
              this.subjectsDropdown.selectedItems.push({ ...data })
              this.initialFormData.subjects.push({ ...data })
            })
          }
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

  checkInProgress(data: any, type: string) {
    if (!this.updatedForm) this.updatedForm = { ...this.initialFormData }
    this.updatedForm[type] = [...data]
    for (var key of Object.keys(this.updatedForm)) {
      if (this.initialFormData) {
        if (JSON.stringify(this.updatedForm[key]) !== JSON.stringify(this.initialFormData[key])) {
          this.isInpsogress = true
        }
      } else {
        this.isInpsogress = true
      }
    }
    this.inProgress.emit({ isInpsogress: this.isInpsogress, type: 'stepForm1' })
    this.buttonConfig.disabled = !this.isInpsogress
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
        default: {
          // this.getAllCountries();
          // this.statusUpdate.emit({id: 1, status: 'inprocess'});
          break;
        }
      }
      this.checkInProgress(selectedData.val, selectedData.controller)
    }
  }

  handleSubmit() {
    const formData = new stepForm1
    for (var key of Object.keys(this.updatedForm)) {
      switch (key) {
        case 'country':
          formData.data[key] = this.updatedForm[key][0] ? this.updatedForm[key][0] : null
          break;
        case 'region':
          formData.data[key] = this.updatedForm[key][0] ? this.updatedForm[key][0] : null
          break;
        case 'academicYear':
          formData.data[key] = this.updatedForm[key][0] ? this.updatedForm[key][0] : null
          break;
        default:
          formData.data[key] = this.updatedForm[key]
          break;
      }
    }
    formData.done = this.isDone
    formData.inProgress = this.isInpsogress
    console.log(formData, "formData ==!!")
    this.onSubmit.emit(formData);
  }

  resetFromCountry() {
    this.regionDropdown.selectedItems = []
    this.academicYearDropdown.selectedItems = []
    this.gradesDropdown.selectedItems = []
    this.subjectsDropdown.selectedItems = []
    // if (this.updatedForm) {
    console.log(this.updatedForm, "==+++")
    this.updatedForm.region = []
    this.updatedForm.academicYear = []
    this.updatedForm.grades = []
    this.updatedForm.subjects = []
    // }
  }

  resetFromRegion() {
    this.academicYearDropdown.selectedItems = []
    this.gradesDropdown.selectedItems = []
    this.subjectsDropdown.selectedItems = []
    if (this.updatedForm) {
      this.updatedForm.academicYear = [];
      this.updatedForm.grades = []
      this.updatedForm.subjects = []
    }
  }

  resetFromAcademicYear() {
    this.gradesDropdown.selectedItems = []
    this.subjectsDropdown.selectedItems = []
    if (this.updatedForm) {
      this.updatedForm.grades = []
      this.updatedForm.subjects = []
    }
  }
}

