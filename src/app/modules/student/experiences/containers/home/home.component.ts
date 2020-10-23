import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import {
  Card,
  CardList,
} from 'src/app/modules/shared/constants/model/card-experience.model'
import {
  FilterAcademicYear,
  FilterOptions,
  FilterOptionsValues,
  FilterSubject,
} from 'src/app/modules/shared/constants/model/filter.model'
import { InvitationService } from 'src/app/modules/shared/services/invitation/invitation.service'
import { CardSort, CardSortType } from '../../constants/model/experience.model'
import { CardListEntityService } from '../../store/entity/card-list/card-list-entity.service'
import { SubjectEntityService } from '../../store/entity/subjects/subject-entity.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  imageUrl = ''
  username = ''
  profileCompleted = false
  cards$: Observable<CardList>
  currentPage = 1
  totalItems = 0
  itemsPerPage = 6
  maxSize = 3
  sortDropdownData: CardSort[]
  selectedSortBy: Option[]
  sortBy: CardSortType = 'openedAt'
  searchtext = ''
  filterSum = 0
  subjects: FilterSubject[]
  academicYears: FilterAcademicYear[]
  filterOption: any = {}
  filterLoading = false
  loading = false
  loaded = false
  acceptLoading = false
  subscriptions = new SubSink()
  academicYearSubcription = new SubSink()
  subjectSubcription = new SubSink()
  invitationSubscription = new SubSink()
  clearTimeout = new ClearAllSetTimeouts()

  state: FilterOptionsValues[] = [
    {
      id: 'PENDING',
      value:
        'PRIVATEHOME_EXPERIENCES.home_student_experiences_filter_state_pending',
      checked: false,
    },
    {
      id: 'DONE',
      value:
        'PRIVATEHOME_EXPERIENCES.home_student_experiences_filter_state_completed',
      checked: false,
    },
  ]

  constructor(
    private userService: UserService,
    private cardListService: CardListEntityService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private subjectDataService: SubjectEntityService,
    private invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    this.filterOption = {
      state: this.state,
      subjects: this.subjects,
    }
    this.getUsertype()
    this.routeInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.academicYearSubcription.unsubscribe()
    this.subjectSubcription.unsubscribe()
    this.invitationSubscription.unsubscribe()
  }

  getUsertype(): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      this.imageUrl = user?.imageUrl
      this.username = user?.name
      this.profileCompleted = user?.profileCompleted
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
      this.getCardsList(routeQuery)
    })
  }

  // set query params to url
  setQueryParams(queryParams: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    })
  }

  getCardsList(routerQuery: string = ''): void {
    const userId = this.userService.getUserId()
    const query = routerQuery
      ? `?${routerQuery}&userId=${userId}`
      : '?userId=${ownerId}'
    this.loading = true
    this.cards$ = this.cardListService.entities$.pipe(
      map((cardsList) => cardsList.find((cards) => cards.pageId === query))
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
    this.cardListService.getWithQuery(query)
  }

  // sort function blocks

  onSortSelection(item: CardSort): void {
    const sortBy = this.sortDropdownData.find((p) => p.id === item.id).type
    const pageNumber = 1
    this.selectedSortBy = [item]
    this.setQueryParams({ sortBy, pageNumber })
  }

  setSortByList(querySortBy: string): void {
    const sortBy = querySortBy ? querySortBy : 'openedAt'
    if (!this.sortDropdownData?.length) {
      this.subscriptions.sink = this.translateService
        .stream([
          'PRIVATEHOME_HEADER.home_sort_option_openedrecently',
          'PRIVATEHOME_HEADER.home_sort_option_lastchange',
          'PRIVATEHOME_HEADER.home_sort_option_name',
        ])
        .subscribe((translations) => {
          this.sortDropdownData = [
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
          ]
          const item = this.sortDropdownData.find((p) => p.type === sortBy)
          this.selectedSortBy = [item]
          this.sortBy = item.type
        })
    } else {
      const item = this.sortDropdownData.find((p) => p.type === sortBy)
      this.selectedSortBy = [item]
      this.sortBy = item.type
    }
  }

  // search function blocks

  handleSearch($event: any): void {
    this.filterLoading = true
    this.searchtext = $event
    this.setQueryParams({ title: $event ? $event : null, pageNumber: 1 })
  }

  // filter function blocks

  setFilter(query: Params): void {
    const filterItems = ['state', 'subjects']
    this.filterSum = 0
    filterItems.forEach((item) => {
      this.filterSum += query[item]
        ? Array.isArray(query[item])
          ? +query[item]?.length
          : 1
        : 0
    })
    this.searchtext = query?.title || ''
    this.setState(query?.state)
    this.setAllSubject(query?.subjects)
  }

  setState(queryState: string[]): void {
    const selectedState = queryState ? queryState : []
    this.state.forEach(
      (state) => (state.checked = selectedState.includes(String(state.id)))
    )
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

  // pagination
  handlePageChange($event: any): void {
    this.setQueryParams({ pageNumber: $event })
  }

  // Card selection
  onExperienceSelection(cardData: Card): void {
    if (cardData.cardtype === 'STUDENT_INVITATION') {
      this.acceptLoading = true
      this.invitationSubscription.sink = this.invitationService
        .invitationAction({
          projectId: cardData.id,
          accepted: true,
          email: this.userService.user.email,
        })
        .subscribe(
          () => {
            this.acceptLoading = false
            this.navigateToExperience(cardData)
            this.invitationSubscription.unsubscribe()
          },
          () => {
            this.acceptLoading = false
            this.invitationSubscription.unsubscribe()
          }
        )
    } else {
      this.navigateToExperience(cardData)
    }
  }

  navigateToExperience(cardData: Card): void {
    this.router.navigate([`experience/${cardData.id}`])
  }
}
