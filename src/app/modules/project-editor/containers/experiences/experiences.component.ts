import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Option } from 'src/app/shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/shared/utility/timeout.utility'
import {
  ProjectList,
  ProjectSort,
  ProjectSortType,
} from '../../constants/model/project.model'
import { ProjectListEntityService } from '../../store/entity/project-list/project-list-entity.service'

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  title = 'Tus experiencias'
  projects$: Observable<ProjectList>
  clearTimeout = new ClearAllSetTimeouts()
  loading = true
  loaded = false
  currentPage = 1
  totalItems = 0
  itemsPerPage = 6
  maxSize = 3
  subscriptions = new SubSink()
  loadedIds = []
  dropDownData: ProjectSort[]
  selectedItem: Option[]
  isSortApplied = false
  sortBy: ProjectSortType = 'openedAt'

  constructor(
    private projectListService: ProjectListEntityService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getOderByData()
    this.getProjectsByPage(0)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.clearTimeout.clearAll()
  }

  pageChanged($event: any): void {
    const page = $event.page - 1
    this.getProjectsByPage(page)
  }

  getOderByData(): void {
    this.translateService
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
            type: 'name',
          },
          {
            id: 3,
            name: translations['PRIVATEHOME_HEADER.home_sort_option_creation'],
            type: 'createdAt',
          },
        ]
        this.selectedItem = [this.dropDownData[0]]
      })
  }

  getProjectsByPage(page: number): void {
    this.currentPage = page
    this.loading = true
    const query = `${page}/${this.itemsPerPage}/?sortBy=${this.sortBy}&title=''`
    this.projects$ = this.projectListService.entities$.pipe(
      map((projectList) => projectList.find((list) => list.pageId === query))
    )
    this.subscriptions.sink = this.projects$.subscribe((list) => {
      if (list) {
        this.loading = false
        this.loadedIds.push(list.pageId)
        if (
          this.totalItems < list.projectCount ||
          this.isSortApplied ||
          !list.projectCount
        ) {
          this.totalItems = list.projectCount
          if (this.loaded === false) {
            this.loaded = true
          }
          this.isSortApplied = false
          this.currentPage = page
        }
      }
    })
    this.projectListService.getWithQuery(query)
  }

  onOderbySelection(item: ProjectSort): void {
    this.isSortApplied = true
    this.sortBy = this.dropDownData.find((p) => p.id === item.id).type
    this.selectedItem = [item]
    this.clearTimeout.add = setTimeout(() => {
      this.getProjectsByPage(0)
    }, 0)
  }
}
