import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ActivatedRoute, Params, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { Option } from 'src/app/shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/shared/utility/timeout.utility'
import {
  FilterAcademicYear,
  FilterOptions,
  FilterOptionsValues,
  FilterSubject,
  ProjectList,
  ProjectSort,
  ProjectSortType,
} from '../../constants/model/project.model'
import { ZipcodeService } from '../../services/zipcode/zipcode.service'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { ProjectListEntityService } from '../../store/entity/project-list/project-list-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { SubjectEntityService } from '../../store/entity/subjects/subject-entity.service'

@Component({
  selector: 'app-inspirations',
  templateUrl: './inspirations.component.html',
  styleUrls: ['./inspirations.component.scss'],
})
export class InspirationsComponent implements OnInit, OnDestroy {
  @Input() maxLength: number

  hasError = false
  projects$: Observable<ProjectList>
  academicYearSubcription = new SubSink()
  subjectSubcription = new SubSink()
  clearTimeout = new ClearAllSetTimeouts()
  loading = true
  loaded = false
  cpLoading = true
  currentPage = 1
  totalItems = 0
  itemsPerPage = 6
  maxSize = 3
  subscriptions = new SubSink()
  projectSubcription = new SubSink()
  dropDownData: ProjectSort[]
  selectedSortBy: Option[]
  sortBy: ProjectSortType = 'openedAt'
  filterLoading = false
  filterSum = 0
  modalRef: BsModalRef
  cpCode = ''
  cpPlaceHolder = ''
  searchtext = ''

  subjects: FilterSubject[]
  academicYears: FilterAcademicYear[]

  stage: FilterOptionsValues[] = [
    {
      id: 'PRIMARIA',
      value: 'FILTERS.experience_filter_stage_option_primaria',
      checked: false,
    },
    {
      id: 'SECUNDARIA',
      value: 'FILTERS.experience_filter_stage_option_secundaria',
      checked: false,
    },
  ]

  type: FilterOptionsValues[] = [
    {
      id: 'DIDACTIC_UNIT',
      value: 'FILTERS.experience_learningunit',
      checked: false,
    },
    {
      id: 'PROJECT',
      value: 'FILTERS.experience_project',
      checked: false,
    },
    {
      id: 'ACTIVITY',
      value: 'FILTERS.experience_activity',
      checked: false,
    },
  ]
  filterOption: any = {}

  @ViewChild('cpModal') cpModal: TemplateRef<any>

  @HostListener('document:keydown.escape', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ): void {
    this.router.navigate([`editor/projects`])
    this.modalRef.hide()
  }

  constructor(
    private projectListService: ProjectListEntityService,
    private projectService: ProjectEntityService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,

    private modalService: BsModalService,
    private zipcodeService: ZipcodeService,
    private userService: UserService,
    private academicYearService: AcademicYearEntityService,
    private subjectDataService: SubjectEntityService
  ) {}

  ngOnInit(): void {
    this.filterOption = {
      stage: this.stage,
      type: this.type,
      academicYears: this.academicYears,
      subjects: this.subjects,
    }
    this.routeInit()
    this.cpModalData()
    this.getUser()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.projectSubcription.unsubscribe()
    this.clearTimeout.clearAll()
  }

  routeInit(): void {
    this.subscriptions.sink = this.route.queryParams.subscribe((query) => {
      const routeQuery = this.router.url?.split('?')[1] || `sortBy=openedAt`
      this.currentPage = query.pageNumber ? +query.pageNumber : 1
      if (!query?.pageNumber || query?.title) {
        this.filterLoading = true
      }
      this.setSortByList(query?.sortBy)
      this.setFilter(query)
      this.getProjectsByQuery(routeQuery)
    })
  }

  setFilter(query: Params): void {
    const filterItems = ['stage', 'type', 'academicYears', 'subjects']
    this.filterSum = 0
    filterItems.forEach((item) => {
      this.filterSum += query[item]
        ? Array.isArray(query[item])
          ? +query[item]?.length
          : 1
        : 0
    })
    this.searchtext = query?.title || ''
    this.setStage(query?.stage)
    this.setType(query?.type)
    this.setAcademicYears(query?.academicYears)
    this.setAllSubject(query?.subjects)
  }

  getUser(): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      if (user && !user.zipcode) {
        setTimeout(() => {
          this.openModal()
        }, 0)
      }
      this.cpLoading = false
    })
  }

  openModal(): void {
    if (this.modalService.getModalsCount() === 0) {
      this.modalRef = this.modalService.show(this.cpModal, {
        ignoreBackdropClick: true,
        class: 'modal-form modal-dialog-centered',
      })
    }
  }

  pageChanged($event: any): void {
    this.setQueryParams({ pageNumber: $event })
  }

  handleSearch($event: any): void {
    this.filterLoading = true
    this.searchtext = $event
    this.setQueryParams({ title: $event ? $event : null, pageNumber: 1 })
  }

  applyFilter(filterOption: FilterOptions): void {
    const filterQueryParams = { pageNumber: 1 }
    this.filterLoading = true
    for (const key in filterOption) {
      if (filterOption.hasOwnProperty(key)) {
        const checkedList = filterOption[key]
          .filter((item) => item.checked)
          .map((item) => item.id)

        !!checkedList.length
          ? (filterQueryParams[key] = checkedList)
          : (filterQueryParams[key] = null)
      }
    }
    this.setQueryParams(filterQueryParams)
  }

  setStage(queryStage: string[]): void {
    const selectedStage = queryStage ? queryStage : []
    this.stage.forEach(
      (stage) => (stage.checked = selectedStage.includes(String(stage.id)))
    )
  }

  setType(queryType: string[]): void {
    const selectedStage = queryType ? queryType : []
    this.type.forEach(
      (type) => (type.checked = selectedStage.includes(String(type.id)))
    )
  }

  setSortByList(querySortBy: string): void {
    const sortBy = querySortBy ? querySortBy : 'openedAt'
    if (!this.dropDownData?.length) {
      this.subscriptions.sink = this.translateService
        .stream([
          'PRIVATEHOME_HEADER.home_sort_option_openedrecently',
          'PRIVATEHOME_HEADER.home_sort_option_lastchange',
          'PRIVATEHOME_HEADER.home_sort_option_name',
          'PRIVATEHOME_HEADER.home_sort_option_creation',
        ])
        .subscribe((translations) => {
          this.dropDownData = [
            {
              id: 0,
              name:
                translations[
                  'PRIVATEHOME_HEADER.home_sort_option_openedrecently'
                ],
              type: 'openedAt',
            },
            {
              id: 1,
              name:
                translations['PRIVATEHOME_HEADER.home_sort_option_lastchange'],
              type: 'updatedAt',
            },
            {
              id: 2,
              name: translations['PRIVATEHOME_HEADER.home_sort_option_name'],
              type: 'title',
            },
            {
              id: 3,
              name:
                translations['PRIVATEHOME_HEADER.home_sort_option_creation'],
              type: 'createdAt',
            },
          ]
          const item = this.dropDownData.find((p) => p.type === sortBy)
          this.selectedSortBy = [item]
          this.sortBy = item.type
        })
    } else {
      const item = this.dropDownData.find((p) => p.type === sortBy)
      this.selectedSortBy = [item]
      this.sortBy = item.type
    }
  }

  getProjectsByQuery(routerQuery: string = ''): void {
    const query = routerQuery ? `?${routerQuery}` : ''
    this.loading = true
    this.projects$ = this.projectListService.entities$.pipe(
      map((projectList) => projectList.find((list) => list.pageId === query))
    )
    this.subscriptions.sink = this.projects$.subscribe((list) => {
      if (list) {
        this.loading = false
        this.totalItems = list.projectCount
        this.loaded = true
        this.clearTimeout.add = setTimeout(() => {
          this.filterLoading = false
        }, 0)
      }
    })
    this.projectSubcription.sink = this.projectService.loading$.subscribe(
      (loading) => {
        if (!loading) {
          this.projectListService.getWithQuery(query)
          this.projectSubcription.unsubscribe()
        }
      }
    )
  }

  onOderbySelection(item: ProjectSort): void {
    const sortBy = this.dropDownData.find((p) => p.id === item.id).type
    const pageNumber = 1
    this.selectedSortBy = [item]
    this.setQueryParams({ sortBy, pageNumber })
  }

  declineModal(): void {
    this.modalRef.hide()
    this.router.navigate([`editor/projects`])
  }

  confirmModal(data: string): void {
    this.zipcodeService.checkZipCode(this.cpCode).subscribe((value) => {
      if (value) {
        this.userService.updateUser({ zipcode: +this.cpCode })
        this.modalRef.hide()
      } else {
        this.hasError = true
      }
    })
    setTimeout(() => {
      this.hasError = false
    }, 5000)
  }

  getInputValue(value: string): void {
    this.cpCode = value
  }

  cpModalData(): void {
    this.subscriptions.sink = this.translateService
      .stream(['PRIVATEHOME_EMPTYSTATE.home_inspire_popup_cp_placeholder'])
      .subscribe((translations) => {
        this.cpPlaceHolder =
          translations[
            'PRIVATEHOME_EMPTYSTATE.home_inspire_popup_cp_placeholder'
          ]
      })
  }

  setQueryParams(queryParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    })
  }

  setAcademicYears(academicYears: string[]): void {
    const selectedAcademicYears = academicYears ? academicYears : []
    this.academicYearSubcription.sink = this.academicYearService.entities$
      .pipe(
        map((academicYearList) =>
          // Hardcoded curriculumId as 0 in academicYearService for getAll() , so that we add this check
          academicYearList.find(
            (academicYear) => academicYear.curriculumId === 0
          )
        )
      )
      .subscribe((academicYearData) => {
        if (!academicYearData) {
          this.academicYearService.getAll()
        } else {
          this.academicYears = academicYearData.academicYears.map(
            (academicYear) => ({
              id: academicYear.id,
              value: academicYear.academicYear,
              checked: !!selectedAcademicYears?.includes(
                String(academicYear.id)
              ),
            })
          )
          this.filterOption.academicYears = this.academicYears
          this.academicYearSubcription.unsubscribe()
        }
      })
  }

  setAllSubject(subjects: string[]): void {
    const selectedSubjects = subjects ? subjects : []
    this.subjectSubcription.sink = this.subjectDataService.entities$.subscribe(
      (subjectData) => {
        if (!subjectData.length) {
          this.subjectDataService.getAll()
        } else {
          this.subjects = subjectData.map((subject) => ({
            ...subject,
            checked: !!selectedSubjects?.includes(String(subject.id)),
          }))
          this.filterOption.subjects = this.subjects
          this.subjectSubcription.unsubscribe()
        }
      }
    )
  }
}
