import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'

import { Observable } from 'rxjs'
import { map, skip } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { CountryEntityService } from '../../store/entity/country/country-entity.service'
import { CurriculumGradesEntityService } from '../../store/entity/curriculum-grades/curriculum-grades-entity.service'
import { CurriculumEntityService } from '../../store/entity/curriculum/curriculum-entity.service'
import { RegionEntityService } from '../../store/entity/region/region-entity.service'
import { StageEntityService } from '../../store/entity/stage/stage-entity.service'

import { Curriculum } from '../../constants/model/curriculum.model'
import {
  AcademicYear,
  Country,
  Grade,
  ProjectErrorType,
  Region,
  Status,
  Step,
  Subject,
} from '../../constants/model/project.model'
import { FormOne } from '../../constants/model/step-forms.model'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'

import {
  DropdownConfigInit,
  StepButtonSubmitConfig,
} from 'src/app/common-shared/constants/data/form-elements.data'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit, OnDestroy {
  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  buttonConfig = new StepButtonSubmitConfig()
  countryDropdown = new DropdownConfigInit('country')
  regionDropdown = new DropdownConfigInit('region')
  academicYearDropdown = new DropdownConfigInit('academicYear')
  stagesDropdown = new DropdownConfigInit('stages')
  gradesDropdown = new DropdownConfigInit('grades', 'multiselect')
  subjectsDropdown = new DropdownConfigInit('subjects', 'multiselect')
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()
  curriculumSubscription = new SubSink()
  academicYearSubcription = new SubSink()
  projectSubcription = new SubSink()
  gradesSubcription = new SubSink()
  country$: Observable<Country>
  region$: Observable<Region>
  academicYear$: Observable<AcademicYear>
  stages$: Observable<Subject[]>
  grades$: Observable<Grade[]>
  subjects$: Observable<Subject[]>
  curriculum: Curriculum
  isFormUpdated = false
  fieldNames = [
    'countryDropdown',
    'regionDropdown',
    'stagesDropdown',
    'academicYearDropdown',
    'gradesDropdown',
    'subjectsDropdown',
  ]
  localExperienceType: number
  modalRef: BsModalRef
  errorType: ProjectErrorType
  @ViewChild('errorModal') errorModal: TemplateRef<any>
  constructor(
    private countryService: CountryEntityService,
    private regionService: RegionEntityService,
    private academicYearService: AcademicYearEntityService,
    private stageService: StageEntityService,
    private curriculumService: CurriculumEntityService,
    private curriculumGradeService: CurriculumGradesEntityService,
    public editor: EditorService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getAllCountries()
    this.stepInIt()
    this.localExperienceType = this.editor.getLocalExperienceType()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.projectSubcription.unsubscribe()
  }

  stepInIt(): void {
    this.subscriptions.sink = this.editor.nextLink$
      .pipe(skip(1))
      .subscribe((link) => {
        if (link && this.isFormUpdated) {
          this.editor.validatingProject = true
          this.handleSubmit()
        } else {
          this.editor.navigateToLink(false)
        }
      })
    this.project$ = this.editor.getDataByStep(1)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[0]
    if (this.project$) {
      this.country$ = this.project$.pipe(map((project) => project?.country))
      this.region$ = this.project$.pipe(map((project) => project?.region))
      this.stages$ = this.project$.pipe(
        map((project) => {
          if (project?.stage && project.stage !== 'EMPTY') {
            return [{ id: project.stage, name: project.stage }]
          }
          return null
        })
      )
      this.academicYear$ = this.project$.pipe(
        map((project) => project?.academicYear)
      )
      this.grades$ = this.project$.pipe(map((project) => project?.grades))
      this.subjects$ = this.project$.pipe(map((project) => project?.subjects))
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe((formStatus) => {
        if (formStatus) {
          this.buttonConfig.submitted = formStatus.state === 'DONE'
          this.initialFormStatus = formStatus.state
          if (formStatus.state !== 'DONE' && this.checkNonEmptyForm()) {
            this.buttonConfig.disabled = false
          }
        }
      })
    }
  }

  getAllCountries(): void {
    this.subscriptions.sink = this.countryService.loading$.subscribe(
      (loading) => (this.countryDropdown.loading = loading)
    )
    this.subscriptions.sink = this.countryService.entities$.subscribe(
      (data) => {
        this.countryDropdown.data = data
        this.countryDropdown.disabled = false
        if (!data.length) {
          this.countryService.getAll()
        }
      }
    )
  }

  getRegions(countryId: number): void {
    this.subscriptions.sink = this.regionService.loading$.subscribe(
      (loading) => (this.regionDropdown.loading = loading)
    )
    this.subscriptions.sink = this.regionService.entities$
      .pipe(
        map((regions) =>
          regions.filter((region) => region.country.id === countryId)
        )
      )
      .subscribe((newData) => {
        if (!newData.length) {
          this.regionService.getWithQuery(countryId.toString())
        }
        this.regionDropdown.data = newData
      })
  }

  getAllStages(): void {
    this.subscriptions.sink = this.stageService.loading$.subscribe(
      (loading) => (this.stagesDropdown.loading = loading)
    )
    this.subscriptions.sink = this.stageService.entities$.subscribe(
      (newData) => {
        if (!newData?.length) {
          this.stageService.getAll()
        }
        this.stagesDropdown.data = newData
      }
    )
  }

  getCurriculum(): void {
    this.subscriptions.sink = this.curriculumService.loading$.subscribe(
      (loading) => (this.academicYearDropdown.loading = loading)
    )
    if (this.stagesDropdown.selectedItems?.length) {
      const selectedRegionId = this.regionDropdown.selectedItems[0]?.id
      this.curriculumSubscription.sink = this.curriculumService.entities$
        .pipe(
          map((curriculums) =>
            curriculums.find(
              (curriculum) =>
                curriculum.region.id === selectedRegionId &&
                curriculum.stage === this.stagesDropdown.selectedItems[0]?.name
            )
          )
        )
        .subscribe((data) => {
          if (!data) {
            const parms = {
              regionId: selectedRegionId.toString(),
              stage: this.stagesDropdown.selectedItems[0]?.name,
            }
            this.curriculumService.getWithQuery(parms)
            this.academicYearDropdown.data = []
            this.gradesDropdown.data = []
          } else {
            this.curriculum = data
            this.getAcademicYears(data.id)
            this.getGrades(data.id)
            this.curriculumSubscription.unsubscribe()
          }
        })
    }
  }

  getAcademicYears(curriculumId: number): void {
    this.subscriptions.sink = this.academicYearService.loading$.subscribe(
      (loading) => (this.academicYearDropdown.loading = loading)
    )
    const selectedCurriculum = curriculumId ? curriculumId : this.curriculum.id
    this.academicYearSubcription.sink = this.academicYearService.entities$
      .pipe(
        map((academicYears) =>
          academicYears.find(
            (curriculumAcademicYear) =>
              curriculumAcademicYear.curriculumId === selectedCurriculum
          )
        )
      )
      .subscribe((newData) => {
        if (!newData) {
          this.academicYearService.getWithQuery(selectedCurriculum?.toString())
        } else {
          this.academicYearDropdown.data = newData.academicYears
          this.academicYearSubcription.unsubscribe()
        }
      })
  }

  getGrades(curriculumId: number): void {
    this.subscriptions.sink = this.curriculumGradeService.loading$.subscribe(
      (loading) => (this.gradesDropdown.loading = loading)
    )
    this.gradesSubcription.sink = this.curriculumGradeService.entities$
      .pipe(
        map((grades) => {
          return grades.find((gradeslist) => gradeslist?.id === curriculumId)
        })
      )
      .subscribe((data) => {
        if (!data) {
          this.curriculumGradeService.getWithQuery(curriculumId?.toString())
        } else {
          this.gradesDropdown.data = data?.gradeList
          this.gradesSubcription.unsubscribe()
        }
      })
  }

  getSubjects(): void {
    const gradeIds = []
    this.gradesDropdown.selectedItems.forEach((grade) => {
      gradeIds.push(grade.id)
    })
    this.subscriptions.sink = this.curriculumGradeService.entities$
      .pipe(
        map((gradeDatas) => {
          let subjectData = []
          for (const gradesData of gradeDatas) {
            for (const gradeList of gradesData.gradeList) {
              if (gradeIds.includes(gradeList.id)) {
                subjectData = [...subjectData, ...gradeList.subjectList]
                subjectData = subjectData.filter(
                  (subject, index, array) =>
                    array.findIndex(
                      (s) => JSON.stringify(s) === JSON.stringify(subject)
                    ) === index
                )
              }
            }
          }
          return [...subjectData]
        })
      )
      .subscribe((newData) => {
        this.subjectsDropdown.data = newData
        const selectedArray = this.subjectsDropdown.selectedItems
        if (selectedArray.length) {
          this.subjectsDropdown.selectedItems = this.subjectsDropdown.data.filter(
            (item) =>
              selectedArray.some(
                ({ id, name }) => item.id === id && item.name === name
              )
          )
        }
      })
  }

  // function to check the status of the form
  checkStatus(): void {
    const statusArray = []
    for (const field of this.fieldNames) {
      if (this[field].status === 'INPROCESS') {
        statusArray.push(this[field].status)
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
    for (const field of this.fieldNames) {
      if (this[field].status === 'PENDING') {
        completedForm = false
      }
    }
    return completedForm
  }

  // function to handle the dropdown selection
  onDropdownSelect(selectedData: any): void {
    const selectedId = selectedData.val[0]?.id
    this.isFormUpdated = selectedData.updated
    if (selectedData) {
      switch (selectedData.controller) {
        case 'country': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) {
            this.getRegions(selectedId)
          }
          break
        }
        case 'region': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) {
            this.getAllStages()
          }
          break
        }
        case 'stages': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) {
            this.getCurriculum()
          }
          break
        }
        case 'academicYear': {
          this.resetForm(selectedData.controller)
          this.handleDropdownDisable(selectedData.controller)
          break
        }
        case 'grades': {
          this.handleDropdownDisable(selectedData.controller)
          if (selectedId) {
            this.getSubjects()
          }
          this.resetForm(selectedData.controller)
          break
        }
        case 'subjects': {
          this.subjectsDropdown.selectedItems = [...selectedData.val]
        }
      }
    }
    if (selectedData.updated) {
      this.checkStatus()
    } else if (
      this.checkNonEmptyForm() &&
      this.initialFormStatus === 'INPROCESS'
    ) {
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
      this.stagesDropdown.selectedItems = []
      this.gradesDropdown.status = 'PENDING'
      this.subjectsDropdown.status = 'PENDING'
      this.academicYearDropdown.status = 'PENDING'
      this.stagesDropdown.status = 'PENDING'
      this.curriculum = null
      if (field === 'country') {
        this.regionDropdown.selectedItems = []
        this.regionDropdown.status = 'PENDING'
      }
    }
    if (field === 'academicYear' || field === 'stages') {
      this.gradesDropdown.selectedItems = []
      this.subjectsDropdown.selectedItems = []
      this.gradesDropdown.status = 'PENDING'
      this.subjectsDropdown.status = 'PENDING'
    }
    if (field === 'stages') {
      this.academicYearDropdown.selectedItems = []
      this.academicYearDropdown.status = 'PENDING'
      this.curriculum = null
    }
    if (
      (field === 'grades' && !this.gradesDropdown.selectedItems.length) ||
      (field === 'grades' && !this.subjectsDropdown.selectedItems?.length)
    ) {
      this.subjectsDropdown.selectedItems = []
      this.subjectsDropdown.status = 'PENDING'
    }
  }

  // disable or enable dropdown field
  handleDropdownDisable(type: string): void {
    const fields = []
    switch (type) {
      case 'country': {
        fields.splice(
          0,
          0,
          'gradesDropdown',
          'subjectsDropdown',
          'academicYearDropdown',
          'stagesDropdown'
        )
        this.regionDropdown.disabled =
          this.countryDropdown.selectedItems.length === 0
        break
      }
      case 'region': {
        fields.splice(
          0,
          0,
          'academicYearDropdown',
          'gradesDropdown',
          'subjectsDropdown'
        )
        this.stagesDropdown.disabled =
          this.regionDropdown.selectedItems.length === 0
        break
      }
      case 'stages': {
        fields.splice(0, 0, 'gradesDropdown', 'subjectsDropdown')
        this.academicYearDropdown.disabled =
          this.stagesDropdown.selectedItems.length === 0
        break
      }
      case 'academicYear': {
        fields.push('subjectsDropdown')
        this.gradesDropdown.disabled =
          this.academicYearDropdown.selectedItems.length === 0
        break
      }
      case 'grades':
        this.subjectsDropdown.disabled =
          this.gradesDropdown.selectedItems.length === 0
        break
    }
    if (fields.length) {
      fields.forEach((field) => (this[field].disabled = true))
    }
  }

  getProjectError(): void {
    this.projectSubcription.sink = this.editor.project$
      .pipe(skip(1))
      .subscribe((project) => {
        if (project?.error) {
          this.errorType = project.error.type
          if (this.errorType === 'CURRICULUM' || this.errorType === 'SUBJECT') {
            this.openErrorModal()
          }
          this.projectSubcription.unsubscribe()
        }
      })
  }

  // Function to submit the form data
  handleSubmit(formStatus?: Status): void {
    this.getProjectError()
    this.handleButtonType()
    const formData: FormOne = {
      data: {
        country: this.countryDropdown.selectedItems[0]
          ? this.countryDropdown.selectedItems[0]
          : null,
        region: this.regionDropdown.selectedItems[0]
          ? this.regionDropdown.selectedItems[0]
          : null,
        academicYear: this.academicYearDropdown.selectedItems[0]
          ? this.academicYearDropdown.selectedItems[0]
          : null,
        grades: this.gradesDropdown.selectedItems,
        subjects: this.subjectsDropdown.selectedItems,
        stage: this.stagesDropdown.selectedItems[0]
          ? this.stagesDropdown.selectedItems[0].name
          : 'EMPTY',
        curriculumId: this.curriculum?.id ? this.curriculum.id : null,
        status: 'INPROCESS', // WIP
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid,
          },
        ],
      },
    }
    this.isFormUpdated = false
    this.editor.handleStepSubmit(formData, formStatus === 'DONE')
  }

  closeModal(): void {
    this.modalRef.hide()
    this.editor.updateOneProjectFromCache({ error: null })
  }

  openErrorModal(): void {
    this.modalRef = this.modalService.show(this.errorModal, {
      ignoreBackdropClick: true,
      class: 'modal-info modal-dialog-centered',
    })
  }
}
