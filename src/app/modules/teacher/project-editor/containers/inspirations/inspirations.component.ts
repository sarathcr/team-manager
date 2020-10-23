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
import { SocialAuthService } from 'angularx-social-login'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import { GoogleAuthService } from 'src/app/common-shared/services/google/google-auth.service'
import { StorageService } from 'src/app/common-shared/services/storage/storage.service'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { CardList } from 'src/app/modules/shared/constants/model/card-experience.model'
import {
  FilterAcademicYear,
  FilterOptions,
  FilterOptionsValues,
  FilterSubject,
} from 'src/app/modules/shared/constants/model/filter.model'
import {
  Project,
  ProjectSort,
  ProjectSortType,
} from '../../constants/model/project.model'
import { ZipcodeService } from '../../services/zipcode/zipcode.service'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { CardListEntityService } from '../../store/entity/card-list/card-list-entity.service'
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
  cards$: Observable<CardList>
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
  userProfileCompleted = false
  currentProject = null
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

  // To be implemented once API is ready
  // teacherLists = [
  //   { name: 'Liam Seattle', img: './assets/images/people/student1.png' },
  //   { name: 'Carles Castellví', img: './assets/images/people/student2.png' },
  //   { name: 'Carme Piñol', img: './assets/images/people/student3.png' },
  //   { name: 'Manel Iglesias', img: './assets/images/people/student4.png' },
  //   { name: 'Elena Jiménez', img: './assets/images/people/student5.png' },
  //   { name: 'Liam Seattle', img: './assets/images/people/student6.png' },
  // ]
  filterOption: any = {}

  @ViewChild('cpModal') cpModal: TemplateRef<any>
  @ViewChild('profileSetupModal') profileSetupModal: TemplateRef<any>
  @HostListener('document:keydown.escape', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ): void {
    this.router.navigate([`editor/experiences`])
    this.modalRef.hide()
  }
  constructor(
    private cardListService: CardListEntityService,
    private projectService: ProjectEntityService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private googleAuthService: GoogleAuthService,
    private modalService: BsModalService,
    private zipcodeService: ZipcodeService,
    private userService: UserService,
    private academicYearService: AcademicYearEntityService,
    private subjectDataService: SubjectEntityService,
    private storageService: StorageService,
    private socialAuthService: SocialAuthService
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
    this.checkUserProfileCompleted()
    this.subscribeGoogleAuth()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.projectSubcription.unsubscribe()
    this.clearTimeout.clearAll()
  }

  subscribeGoogleAuth(): void {
    this.subscriptions.sink = this.socialAuthService.authState.subscribe(
      (user) => {
        if (user) {
          const tokenExpiry = JSON.parse(atob(user.idToken.split('.')[1]))?.exp
          this.googleAuthService.setGoogleToken(user.authToken) // set google auth token
          this.googleAuthService.setGoogleTokenExpiry(tokenExpiry) // set google auth token expiry
          this.cloneProject(this.currentProject)
        }
      }
    )
  }

  checkUserProfile(project: Project): void {
    if (this.userProfileCompleted === true) {
      this.cloneProject(project)
    } else {
      this.openProfileModal('profileSetupModal')
    }
  }
  checkUserProfileCompleted(): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      if (user) {
        this.userProfileCompleted = !!user?.profileCompleted
      }
    })
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
      this.getCardsByQuery(routeQuery)
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
          //  Temporarily removing the zipcode register popup until it's API gets ready
          // this.openModal()
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

  openProfileModal(modal: string): void {
    if (this.modalService.getModalsCount() === 0) {
      this.modalRef = this.modalService.show(this[modal], {
        ignoreBackdropClick: true,
        class: 'modal-info modal-dialog-centered',
      })
    }
  }

  gotoProfile(): void {
    this.router.navigate(['./profile/setup'])
    this.modalRef.hide()
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

  getCardsByQuery(routerQuery: string = ''): void {
    const query = routerQuery
      ? `?${routerQuery}&options=Inspire`
      : '?options=Inspire'
    this.loading = true
    this.cards$ = this.cardListService.entities$.pipe(
      map((cardList) => cardList.find((list) => list.pageId === query))
    )
    this.subscriptions.sink = this.cards$.subscribe((list) => {
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
          this.cardListService.getWithQuery(query)
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
    this.router.navigate([`editor/experiences`])
  }

  declineProfileModal(): void {
    this.modalRef.hide()
    this.router.navigate([`editor/experiences/inspirate`])
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

  cloneProject(project: Project): void {
    this.currentProject = project
    this.loaded = false
    const jwt = this.storageService.getData('GOOGLE_TOKEN')
    if (!jwt) {
      this.googleAuthService.googleLogin()
      this.loaded = true
    } else {
      const userId = +this.storageService.getUserId()
      this.subscriptions.sink = this.projectService
        .add({ ...project, jwt, userId })
        .subscribe((data) => {
          if (data?.id) {
            this.router.navigate([
              `editor/${data?.type.split('_').join('-').toLowerCase()}/${
                data.id
              }/1`,
            ])
          } else {
            this.loaded = true
          }
        })
    }
  }
}
