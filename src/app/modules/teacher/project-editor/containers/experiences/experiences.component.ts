import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import { PreviousRouteService } from 'src/app/common-shared/services/previous-route/previous-route.service'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import {
  Card,
  CardList,
  ExperienceType,
} from 'src/app/modules/shared/constants/model/card-experience.model'
import {
  FilterAcademicYear,
  FilterOptions,
  FilterOptionsValues,
  FilterSubject,
} from 'src/app/modules/shared/constants/model/filter.model'
import { InvitationService } from 'src/app/modules/shared/services/invitation/invitation.service'
import {
  ProjectSort,
  ProjectSortType,
} from '../../constants/model/project.model'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { CardListEntityService } from '../../store/entity/card-list/card-list-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { SubjectEntityService } from '../../store/entity/subjects/subject-entity.service'

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  cards$: Observable<CardList>
  academicYearSubcription = new SubSink()
  subjectSubcription = new SubSink()
  clearTimeout = new ClearAllSetTimeouts()
  loading = true
  loaded = false
  currentPage = 1
  totalItems = 0
  itemsPerPage = 6
  maxSize = 3
  modalRef: BsModalRef
  subscriptions = new SubSink()
  invitationSubscription = new SubSink()
  projectSubcription = new SubSink()
  loadedIds = []
  dropDownData: ProjectSort[]
  selectedSortBy: Option[]
  filterLoading = false
  filterSum = 0
  sortBy: ProjectSortType = 'openedAt'
  searchtext = ''
  userProfileCompleted = false
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
  invitatorMail: string
  localExperienceType: number
  cardData: Card
  projectId: number
  queryString: string
  acceptLoading = false
  rejectLoading = false
  @ViewChild('profileSetupModal') profileSetupModal: TemplateRef<any>
  @ViewChild('LearingexperienceModal') LearingexperienceModal: TemplateRef<any>
  @ViewChild('invitationModal') invitationModal: TemplateRef<any>

  constructor(
    private cardListService: CardListEntityService,
    private projectService: ProjectEntityService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private academicYearService: AcademicYearEntityService,
    private subjectDataService: SubjectEntityService,
    private userService: UserService,
    private invitationService: InvitationService,
    private previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.filterOption = {
      stage: this.stage,
      type: this.type,
      academicYears: this.academicYears,
      subjects: this.subjects,
    }
    this.routeInit()
    setTimeout(() => {
      this.checkUserProfile()
    }, 0)
  }

  ngOnDestroy(): void {
    if (this.modalService.getModalsCount()) {
      this.modalRef.hide()
    }
    this.subscriptions.unsubscribe()
    this.projectSubcription.unsubscribe()
    this.invitationSubscription.unsubscribe()
    this.clearTimeout.clearAll()
  }

  checkUserProfile(checkFrom?: 'cardSelection'): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      this.userProfileCompleted = !!user?.profileCompleted
      if (user && !user?.profileCompleted) {
        if (
          this.previousRouteService.getPreviousUrl() === '/login' ||
          checkFrom === 'cardSelection'
        ) {
          this.clearTimeout.add = this.openModal('profileSetupModal')
        }
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

  createExperience(): void {
    if (!this.userProfileCompleted) {
      this.openModal('profileSetupModal')
    } else {
      this.chooseExperience()
    }
  }

  chooseExperience(): void {
    this.modalRef = this.modalService.show(this.LearingexperienceModal, {
      class:
        ' modal-dialog modal-dialog-centered modal-layout_large modal-layout_height_auto',
    })
  }

  declineModal(): void {
    this.modalRef.hide()
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

  openModal(modal: string): void {
    if (this.modalService.getModalsCount() === 0) {
      this.modalRef = this.modalService.show(this[modal], {
        ignoreBackdropClick: true,
        class: 'modal-info modal-dialog-centered',
      })
    }
  }

  getCardsByQuery(routerQuery: string = ''): void {
    const userId = this.userService.getUserId()
    const query = routerQuery
      ? `?${routerQuery}&userId=${userId}`
      : `?userId=${userId}`
    this.queryString = query
    this.loading = true
    this.cards$ = this.cardListService.entities$.pipe(
      map((cardsList) => cardsList.find((list) => list.pageId === query))
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

  onCardSelection(data: Card): void {
    if (this.userService.user.profileCompleted) {
      if (data.cardtype === 'TEACHER_INVITATION') {
        this.cardData = data
        this.localExperienceType = this.getLocalExperienceType(data.type)
        this.openInvitationModal()
      } else {
        this.router.navigate([
          `editor/${data?.type.split('_').join('-').toLowerCase()}/${
            data.id
          }/1`,
        ])
      }
    } else {
      this.checkUserProfile('cardSelection')
    }
  }

  // invitation actions

  openInvitationModal(): void {
    this.modalRef = this.modalService.show(this.invitationModal, {
      ignoreBackdropClick: true,
      class: 'modal-info modal-dialog-centered',
    })
  }

  invitationAction(accepted: boolean = false): void {
    if (accepted) {
      this.acceptLoading = true
    } else {
      this.rejectLoading = true
    }
    this.invitationSubscription.sink = this.invitationService
      .invitationAction({
        projectId: this.cardData.id,
        accepted,
        email: this.userService.user.email,
      })
      .subscribe(
        () => {
          this.closeInvitationModal(accepted)
          this.invitationSubscription.unsubscribe()
        },
        () => {
          this.acceptLoading = false
          this.rejectLoading = false
          this.invitationSubscription.unsubscribe()
        }
      )
  }

  closeInvitationModal(accepted?: boolean): void {
    this.modalRef.hide()
    this.clearTimeout.add = setTimeout(() => {
      if (accepted) {
        this.router.navigate([
          `editor/${this.cardData?.type.split('_').join('-').toLowerCase()}/${
            this.cardData.id
          }/1`,
        ])
      } else if (accepted === false) {
        this.filterLoading = true
        this.cardListService.getWithQuery(this.queryString)
      }
      this.localExperienceType = null
      this.acceptLoading = false
      this.rejectLoading = false
      this.cardData = null
    }, 400)
  }

  // Get localization Index based on Experiance Type
  getLocalExperienceType(experienceType: ExperienceType): number {
    return experienceType === 'PROJECT'
      ? 0
      : experienceType === 'DIDACTIC_UNIT'
      ? 1
      : experienceType === 'ACTIVITY'
      ? 2
      : null
  }
}
