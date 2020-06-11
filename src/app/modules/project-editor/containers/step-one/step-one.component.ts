import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { FieldConfig } from '../../../../shared/constants/field.model'
import { CountryEntityService } from '../../services/country/country-entity.service'
import { RegionEntityService } from '../../services/region/region-entity.service'
import { AcademicYearEntityService } from '../../services/academic-year/academic-year-entity.service'
import { GradeEntityService } from '../../services/grade/grade-entity.service'
import { SubjectEntityService } from '../../services/subject/subject-entity.service'
import { formOneInitData } from '../../constants/step-forms.data'
import { FormOneInitData, FormOne } from '../../constants/step-forms.model'
import { Step, Status } from '../../constants/step.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  initialFormData: FormOneInitData = new formOneInitData
  buttonConfig: FieldConfig
  countryDropdown: FieldConfig
  regionDropdown: FieldConfig
  academicYearDropdown: FieldConfig
  gradesDropdown: FieldConfig
  subjectsDropdown: FieldConfig
  active: boolean = false
  initialFormStatus: Status = "PENDING"

  constructor(
    private countryService: CountryEntityService,
    private regionService: RegionEntityService,
    private academicYearService: AcademicYearEntityService,
    private gradeService: GradeEntityService,
    private subjectService: SubjectEntityService,
    private translateService: TranslateService,
    private editor: EditorService
  ) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.getAllCountries()
    this.formInIt()
  }

  ngOnDestroy(): void {
    // if (this.isFormUpdated()) {
    //   this.handleSubmit()
    // }
  }

  formInIt() {
    this.project$ = this.editor.getStepData('stepOne')
    this.step$ = this.editor.getStepStatus(1)
    this.step = this.editor.steps.one
    if (this.project$) {
      this.project$
        .subscribe(data => {
          let tempinitialFormData = new formOneInitData
          if (data?.country) {
            this.countryDropdown.selectedItems = [{ ...data.country }]
            tempinitialFormData.country.push({ ...data.country })
            this.getRegions(data.country.id)
            this.regionDropdown.disabled = false
          }
          if (data?.region) {
            const regionData = { id: data.region?.id, name: data.region?.name }
            this.regionDropdown.selectedItems = [{ ...regionData }]
            tempinitialFormData.region.push(regionData)
            this.getAcademicYears()
            this.academicYearDropdown.disabled = false
          }
          if (data?.academicYear) {
            this.academicYearDropdown.selectedItems = [{ ...data.academicYear }]
            tempinitialFormData.academicYear.push({ ...data.academicYear })
            this.getGrades(data.academicYear.id, data.region.id)
            this.gradesDropdown.disabled = false
          }
          if (data?.grades) {
            const gradesData = this.changeResponseFormat(data.grades)
            this.gradesDropdown.selectedItems = []
            this.gradesDropdown.selectedItems.push(...gradesData)
            tempinitialFormData.grades.push(...gradesData)
            if (data.grades.length) {
              this.getSubjects(data.grades[0].id)
              this.subjectsDropdown.disabled = false
            }
          }
          if (data?.subjects?.length) {
            const subjectData = this.changeResponseFormat(data.subjects)
            this.subjectsDropdown.selectedItems = []
            this.subjectsDropdown.selectedItems.push(...subjectData)
            tempinitialFormData.subjects.push(...subjectData)
          }
          this.initialFormData = tempinitialFormData
        })
    }
    if (this.step$) {
      this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state == "DONE"
            this.initialFormStatus = formStatus.state
            if (formStatus.state != "DONE" && this.checkNonEmptyForm())
              this.buttonConfig.disabled = false
          }
        }
      )
    }
  }

  changeResponseFormat(data: any) {
    return data.map(({ id, name }) => ({ id, name }))
  }

  getAllCountries() {
    this.countryService.entities$
      .subscribe(data => {
        this.countryDropdown.options = data
        if (!data.length) this.countryService.getAll()
      })
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
    const selectedRegionId = regionId ? regionId : this.regionDropdown.selectedItems[0].id
    this.gradeService.entities$
      .pipe(
        map(grades => grades.filter(grade => grade.academicYear.id == academicyearId && grade.region.id == selectedRegionId))
      )
      .subscribe(newData => {
        if (!newData.length) {
          let parms = {
            regionId: selectedRegionId.toString(),
            academicyearId: academicyearId.toString()
          }
          this.gradeService.getWithQuery(parms) //trigger API after checking the store
        }
        this.gradesDropdown.options = newData
      })
  }

  getSubjects(gradeId: number) {
    this.subjectService.entities$
      .subscribe(newData => {
        if (!newData.length) this.subjectService.getWithQuery(gradeId.toString()) //trigger API after checking the store
        this.subjectsDropdown.options = newData
      })
  }

  checkStatus() {
    if (this.checkEmptyForm())
      this.step.state = "PENDING"
    else
      this.step.state = "INPROCESS"
  }

  // checks if the form is empty
  checkEmptyForm() {
    if (!this.countryDropdown.selectedItems.length &&
      !this.regionDropdown.selectedItems.length &&
      !this.academicYearDropdown.selectedItems.length &&
      !this.gradesDropdown.selectedItems.length &&
      !this.subjectsDropdown.selectedItems.length
    ) {
      return true
    }
    return false
  }

  // checks the form is completely filled or not
  checkNonEmptyForm() {
    if (this.countryDropdown.selectedItems.length &&
      this.regionDropdown.selectedItems.length &&
      this.academicYearDropdown.selectedItems.length &&
      this.gradesDropdown.selectedItems.length &&
      this.subjectsDropdown.selectedItems.length
    ) {
      return true
    } else {
      return false
    }
  }

  isFormUpdated() {
    if (!this.isEqual(this.initialFormData.country, this.countryDropdown.selectedItems) ||
      !this.isEqual(this.initialFormData.region, this.regionDropdown.selectedItems) ||
      !this.isEqual(this.initialFormData.academicYear, this.academicYearDropdown.selectedItems) ||
      !this.isEqual(this.initialFormData.grades, this.gradesDropdown.selectedItems) ||
      !this.isEqual(this.initialFormData.subjects, this.subjectsDropdown.selectedItems) ||
      this.initialFormStatus !== this.step.state
    ) {
      return true
    }
    return false
  }

  checkInProgress(data: any, type: string) {
    let values: Array<any> = []
    for (var key of Object.keys(this.initialFormData)) {
      // let value: any
      switch (key) {
        case 'country':
          values.push(this.isEqual(this.initialFormData.country, this.countryDropdown.selectedItems))
          break
        case 'region':
          values.push(this.isEqual(this.initialFormData.region, this.regionDropdown.selectedItems))
          break
        case 'academicYear':
          values.push(this.isEqual(this.initialFormData.academicYear, this.academicYearDropdown.selectedItems))
          break
        case 'grades':
          values.push(this.isEqual(this.initialFormData.grades, this.gradesDropdown.selectedItems))
          break
        default:
          values.push(this.isEqual(this.initialFormData.subjects, this.subjectsDropdown.selectedItems))
          break
      }
    }
    if (values.includes(false)) {
      this.step.state = 'INPROCESS'
    }
  }

  onDropdownSelect(selectedData: any) {
    this.checkInProgress(selectedData.val, selectedData.controller)
    const selectedId = selectedData.val[0]?.id
    if (selectedData) {
      switch (selectedData.controller) {
        case 'country': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) this.getRegions(selectedId)
          break
        }
        case 'region': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) this.getAcademicYears()
          break
        }
        case 'academicYear': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) this.getGrades(selectedId)
          break
        }
        case 'grades': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) this.getSubjects(selectedId)
        }
      }
      this.checkInProgress(selectedData.val, selectedData.controller)
    }
    this.handleButtonType()
  }

  // Changes the button according to form status
  handleButtonType() {
    if (this.checkNonEmptyForm()) {
      this.buttonConfig.disabled = false
      this.buttonConfig.submitted = false
    } else {
      this.buttonConfig.disabled = true
      this.buttonConfig.submitted = false
    }
  }

  handleSubmit(formStatus?: Status) {
    if (formStatus == 'DONE') {
      this.step.state = formStatus
      this.initialFormStatus = formStatus
    }
    else
      this.checkStatus()
    let formData: FormOne = {
      data: {
        country: this.countryDropdown.selectedItems[0] ? this.countryDropdown.selectedItems[0] : null,
        region: this.regionDropdown.selectedItems[0] ? this.regionDropdown.selectedItems[0] : null,
        academicYear: this.academicYearDropdown.selectedItems[0] ? this.academicYearDropdown.selectedItems[0] : null,
        grades: this.gradesDropdown.selectedItems,
        subjects: this.subjectsDropdown.selectedItems,
        status: 'INPROCESS', // WIP
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid
          }
        ]
      }
    }
    this.updateInitialData();
    if (formStatus == 'DONE' && this.checkNonEmptyForm()) {
      this.buttonConfig.submitted = this.step.state == 'DONE'
      this.buttonConfig.disabled = this.step.state == "DONE"
    }
    this.editor.handleFormSubmit(formData, this.step.state == "DONE")
  }

  // reset form fields
  resetForm(field: string) {
    if (field == 'country' || field == 'region') {
      this.gradesDropdown.selectedItems = []
      this.subjectsDropdown.selectedItems = []
      this.academicYearDropdown.selectedItems = []
      if (field == 'country')
        this.regionDropdown.selectedItems = []
    }
    if (field == 'academicYear') {
      this.gradesDropdown.selectedItems = []
      this.subjectsDropdown.selectedItems = []
    }
    if (field == 'grades' && !this.gradesDropdown.selectedItems.length)
      this.subjectsDropdown.selectedItems = []
  }

  isEqual(d1: any[], d2: any[]) {
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

  // disable or enable dropdown field
  handleDropdownDisable(type: string) {
    let fields = [];
    switch (type) {
      case 'country': fields.splice(0, 0, "gradesDropdown", "subjectsDropdown", "academicYearDropdown")
        this.regionDropdown.disabled = this.countryDropdown.selectedItems.length == 0
        break
      case 'region': fields.splice(0, 0, "gradesDropdown", "subjectsDropdown")
        this.academicYearDropdown.disabled = this.regionDropdown.selectedItems.length == 0
        break
      case 'academicYear': fields.push("subjectsDropdown")
        this.gradesDropdown.disabled = this.academicYearDropdown.selectedItems.length == 0
        break
      case 'grades': this.subjectsDropdown.disabled = this.gradesDropdown.selectedItems.length == 0
        break
    }
    if (fields.length)
      fields.forEach(field => this[field].disabled = true)
  }

  // fuction updates the initial form data on form submit
  updateInitialData() {
    this.initialFormData = {
      country: this.countryDropdown.selectedItems,
      region: this.regionDropdown.selectedItems,
      academicYear: this.academicYearDropdown.selectedItems,
      grades: this.gradesDropdown.selectedItems,
      subjects: this.subjectsDropdown.selectedItems
    }
  }

  createFormConfig() {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
    }
    this.countryDropdown = {
      field: 'dropdown',
      name: 'country',
      id: 'country',
      multiselect: false,
      options: [],
      selectedItems: []
    }
    this.regionDropdown = {
      field: 'dropdown',
      name: 'region',
      id: 'region',
      multiselect: false,
      options: [],
      disabled: true,
      selectedItems: []
    }
    this.academicYearDropdown = {
      field: 'dropdown',
      name: 'academicYear',
      id: 'academicYear',
      textField: 'academicYear',
      multiselect: false,
      options: [],
      disabled: true,
      selectedItems: []
    }
    this.gradesDropdown = {
      field: 'dropdown',
      name: 'grades',
      id: 'grade',
      disabled: true,
      multiselect: true,
      options: [],
      selectedItems: []
    }
    this.subjectsDropdown = {
      field: 'dropdown',
      name: 'subjects',
      id: 'subject',
      disabled: true,
      multiselect: true,
      options: [],
      selectedItems: []
    }
    // Translation
    this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'STARTING_POINT.project_startingpoint_year',
      'STARTING_POINT.project_startingpoint_grades',
      'STARTING_POINT.project_startingpoint_region',
      'STARTING_POINT.project_startingpoint_country',
      'STARTING_POINT.project_startingpoint_subjects',
      'STARTING_POINT.project_startingpoint_year_placeholder',
      'STARTING_POINT.project_startingpoint_grades_placeholder',
      'STARTING_POINT.project_startingpoint_region_placeholder',
      'STARTING_POINT.project_startingpoint_country_placeholder',
      'STARTING_POINT.project_startingpoint_subjects_placeholder',
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
      this.countryDropdown.label = translations['STARTING_POINT.project_startingpoint_country']
      this.countryDropdown.placeholder = translations['STARTING_POINT.project_startingpoint_country_placeholder']
      this.regionDropdown.label = translations['STARTING_POINT.project_startingpoint_region']
      this.regionDropdown.placeholder = translations['STARTING_POINT.project_startingpoint_region_placeholder']
      this.academicYearDropdown.label = translations['STARTING_POINT.project_startingpoint_year']
      this.academicYearDropdown.placeholder = translations['STARTING_POINT.project_startingpoint_year_placeholder']
      this.gradesDropdown.label = translations['STARTING_POINT.project_startingpoint_grades']
      this.gradesDropdown.placeholder = translations['STARTING_POINT.project_startingpoint_grades_placeholder']
      this.subjectsDropdown.label = translations['STARTING_POINT.project_startingpoint_subjects']
      this.subjectsDropdown.placeholder = translations['STARTING_POINT.project_startingpoint_subjects_placeholder']
    })
  }

}

