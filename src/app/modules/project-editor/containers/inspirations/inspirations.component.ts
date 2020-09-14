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

import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { User } from 'src/app/modules/auth/constants/model/login'
import { UserEntityService } from 'src/app/modules/auth/store/entity/user/user-entity.service'
import { Option } from 'src/app/shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/shared/utility/timeout.utility'
import {
  ProjectList,
  ProjectSort,
  ProjectSortType,
  ProjectTitle,
} from '../../constants/model/project.model'
import { ZipcodeService } from '../../services/zipcode/zipcode.service'
import { ProjectListEntityService } from '../../store/entity/project-list/project-list-entity.service'

@Component({
  selector: 'app-inspirations',
  templateUrl: './inspirations.component.html',
  styleUrls: ['./inspirations.component.scss'],
})
export class InspirationsComponent implements OnInit, OnDestroy {
  @Input() projectData: ProjectTitle
  @Input() maxLength: number

  hasError = false
  title = 'Inspirate'
  projects$: Observable<ProjectList>
  clearTimeout = new ClearAllSetTimeouts()
  loading = true
  loaded = false
  cpLoading = true
  currentPage = 1
  totalItems = 0
  itemsPerPage = 6
  maxSize = 3
  subscriptions = new SubSink()
  loadedIds = []
  dropDownData: ProjectSort[]
  selectedItem: Option[]
  sortBy: ProjectSortType = 'updatedAt'
  isSortApplied = false
  modalTitle = ''
  modalConfirmLabel = ''
  modalRef: BsModalRef
  cpCode = ''
  cpPlaceHolder = ''
  user: User

  @ViewChild('cpModal') cpModal: TemplateRef<any>

  @HostListener('document:keydown.escape', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ): void {
    this.router.navigate([`editor/projects`])
    this.modalRef.hide()
  }

  constructor(
    private projectListService: ProjectListEntityService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private zipcodeService: ZipcodeService,
    private userService: UserEntityService
  ) {}

  ngOnInit(): void {
    this.getOderByData()
    this.getProjectsByPage(0)
    this.cpModalData()
    this.getUser()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.clearTimeout.clearAll()
  }

  getUser(): void {
    this.subscriptions.sink = this.userService.entities$.subscribe((value) => {
      this.user = value[0]
      if (this.user && !this.user.zipcode) {
        setTimeout(() => {
          this.openModal()
        }, 0)
      }
      this.cpLoading = false
    })
  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.cpModal, {
      ignoreBackdropClick: true,
      class: 'modal-form modal-dialog-centered',
    })
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
            type: 'openedAt',
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

  declineModal(): void {
    this.router.navigate([`editor/projects`])
    this.modalRef.hide()
  }

  confirmModal(data: string): void {
    this.zipcodeService.checkZipCode(this.cpCode).subscribe((value) => {
      if (value) {
        const { id, email, profile } = this.user
        this.userService.update({ id, email, profile, zipcode: +this.cpCode })
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
}
