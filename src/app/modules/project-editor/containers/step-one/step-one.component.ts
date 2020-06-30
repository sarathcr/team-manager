import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'
import { CountryEntityService } from '../../store/entity/country/country-entity.service'
import { RegionEntityService } from '../../store/entity/region/region-entity.service'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'

import { FormOne } from '../../constants/step-forms.model'
import { Step, Status } from '../../constants/step.model'
import { Country, Region, AcademicYear, Grade, Subject } from '../../constants/project.model'

import { ButtonSubmitConfig, DropdownConfigInit } from '../../constants/form-config.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { FormOneFieldsStatus } from '../../constants/step-forms.data'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit, OnDestroy {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  buttonConfig = new ButtonSubmitConfig()
  countryDropdown = new DropdownConfigInit('country')
  regionDropdown = new DropdownConfigInit('region')
  academicYearDropdown = new DropdownConfigInit('academicYear')
  gradesDropdown = new DropdownConfigInit('grades', 'multiselect')
  subjectsDropdown = new DropdownConfigInit('subjects', 'multiselect')
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()
  country$: Observable<Country>
  region$: Observable<Region>
  academicYear$: Observable<AcademicYear>
  grades$: Observable<Grade[]>
  subjects$: Observable<Subject[]>
  issFormUpdated = false
  fieldsStatus = new FormOneFieldsStatus()

  constructor(
    private countryService: CountryEntityService,
    private regionService: RegionEntityService,
    private academicYearService: AcademicYearEntityService,
    private gradeService: GradeEntityService,
    private editor: EditorService
  ) { }

  ngOnInit(): void {
    this.getAllCountries()
    this.formInIt()
  }

  ngOnDestroy(): void {
    if (this.issFormUpdated) {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  formInIt(): void {
    this.project$ = this.editor.getStepData(1)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[0]
    if (this.project$) {
      this.country$ = this.project$.pipe(map(project => project?.country))
      this.region$ = this.project$.pipe(map(project => project?.region))
      this.academicYear$ = this.project$.pipe(map(project => project?.academicYear))
      this.grades$ = this.project$.pipe(map(project => project?.grades))
      this.subjects$ = this.project$.pipe(map(project => project?.subjects))
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE'
            this.initialFormStatus = formStatus.state
            if (formStatus.state !== 'DONE' && this.checkNonEmptyForm()) {
              this.buttonConfig.disabled = false
            }
          }
        }
      )
    }
  }

  getAllCountries(): void {
    this.subscriptions.sink = this.countryService.entities$
      .subscribe(data => {
        this.countryDropdown.data = data
        this.countryDropdown.disabled = false
        if (!data.length) { this.countryService.getAll() }
      })
  }

  getRegions(countryId: number): void {
    this.subscriptions.sink = this.regionService.entities$
      .pipe(
        map(regions => regions.filter(region => region.country.id === countryId))
      )
      .subscribe(newData => {
        if (!newData.length) { this.regionService.getWithQuery(countryId.toString()) }
        this.regionDropdown.data = newData
      })
  }

  getAcademicYears(): void {
    this.subscriptions.sink = this.academicYearService.entities$
      .subscribe(newData => {
        if (!newData.length) { this.academicYearService.getAll() }
        this.academicYearDropdown.data = newData
      })
  }

  getGrades(academicyearId: number, regionId?: number): void {
    const selectedRegionId = regionId ? regionId : this.regionDropdown.selectedItems[0].id
    this.subscriptions.sink = this.gradeService.entities$
      .pipe(
        map(grades => grades.filter(grade => grade.academicYear?.id === academicyearId
          && grade.region?.id === selectedRegionId))
      )
      .subscribe(newData => {
        if (!newData.length) {
          const parms = {
            regionId: selectedRegionId.toString(),
            academicyearId: academicyearId.toString()
          }
          this.gradeService.getWithQuery(parms)
        }
        this.gradesDropdown.data = newData
      })
  }

  getSubjects(): void {
    const gradeIds = []
    this.gradesDropdown.selectedItems.forEach(grade => { gradeIds.push(grade.id) })
    this.subscriptions.sink = this.gradeService.entities$
      .pipe(map(gradeData => {
        const subjectData = new Set([])
        gradeData.forEach(grade => {
          gradeIds.forEach(gradeId => {
            if (grade.id === gradeId) {
              grade.subjectList.forEach(subject => subjectData.add(subject))
            }
          })
        })
        return [...subjectData]
      }))
      .subscribe(newData => {
        this.subjectsDropdown.data = newData
      })
  }

  // function to check the status of the form
  checkStatus(): void {
    const statusArray = []
    for (const field of Object.keys(this.fieldsStatus)) {
      if (this.fieldsStatus[field] === 'INPROCESS') {
        statusArray.push('INPROCESS')
      }
    }
    if (statusArray.length) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  // checks the form is completely filled or not
  checkNonEmptyForm(): boolean {
    let completedForm = true
    for (const field of Object.keys(this.fieldsStatus)) {
      if (this.fieldsStatus[field] === 'PENDING') {
        completedForm = false
      }
    }
    return completedForm
  }

  // function to handle the dropdown selection
  onDropdownSelect(selectedData: any): void {
    const selectedId = selectedData.val[0]?.id
    this.issFormUpdated = selectedData.updated
    if (selectedData) {
      this.fieldsStatus[selectedData.controller] = selectedData.status
      switch (selectedData.controller) {
        case 'country': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) { this.getRegions(selectedId) }
          break
        }
        case 'region': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) { this.getAcademicYears() }
          break
        }
        case 'academicYear': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) { this.getGrades(selectedId) }
          break
        }
        case 'grades': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) { this.getSubjects() }
          break
        }
        case 'subjects': {
          this.subjectsDropdown.selectedItems = [...selectedData.val]
        }
      }
    }
    if (selectedData.updated) {
      this.checkStatus()
    } else if (this.checkNonEmptyForm() && this.initialFormStatus === 'INPROCESS') {
      this.buttonConfig.disabled = false
    } else {
      this.buttonConfig.disabled = true
    }
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    } else {
      if (this.checkNonEmptyForm()) {
        this.buttonConfig.disabled = false
        this.buttonConfig.submitted = false
      } else {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = false
      }
    }
  }

  // reset form fields
  resetForm(field: string): void {
    if (field === 'country' || field === 'region') {
      this.gradesDropdown.selectedItems = []
      this.subjectsDropdown.selectedItems = []
      this.academicYearDropdown.selectedItems = []
      this.fieldsStatus.grades = 'PENDING'
      this.fieldsStatus.subjects = 'PENDING'
      this.fieldsStatus.academicYear = 'PENDING'
      if (field === 'country') {
        this.regionDropdown.selectedItems = []
        this.fieldsStatus.region = 'PENDING'
      }
    }
    if (field === 'academicYear') {
      this.gradesDropdown.selectedItems = []
      this.subjectsDropdown.selectedItems = []
      this.fieldsStatus.grades = 'PENDING'
      this.fieldsStatus.subjects = 'PENDING'
    }
    if (field === 'grades' && !this.gradesDropdown.selectedItems.length) {
      this.subjectsDropdown.selectedItems = []
      this.fieldsStatus.subjects = 'PENDING'
    }
  }

  // disable or enable dropdown field
  handleDropdownDisable(type: string): void {
    const fields = []
    switch (type) {
      case 'country': {
        fields.splice(0, 0, 'gradesDropdown', 'subjectsDropdown', 'academicYearDropdown')
        this.regionDropdown.disabled = this.countryDropdown.selectedItems.length === 0
        break
      }
      case 'region': {
        fields.splice(0, 0, 'gradesDropdown', 'subjectsDropdown')
        this.academicYearDropdown.disabled = this.regionDropdown.selectedItems.length === 0
        break
      }
      case 'academicYear': {
        fields.push('subjectsDropdown')
        this.gradesDropdown.disabled = this.academicYearDropdown.selectedItems.length === 0
        break
      }
      case 'grades':
        this.subjectsDropdown.disabled = this.gradesDropdown.selectedItems.length === 0
        break
    }
    if (fields.length) {
      fields.forEach(field => this[field].disabled = true)
    }
  }

  // Function to submit the form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = formStatus
      this.initialFormStatus = formStatus
    }
    this.handleButtonType()
    const formData: FormOne = {
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
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }

}
