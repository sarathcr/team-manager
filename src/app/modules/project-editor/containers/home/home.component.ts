import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ProjectList } from '../../constants/model/project.model'
import { ProjectListEntityService } from '../../store/entity/project-list/project-list-entity.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'Tus plantillas'
  projects$: Observable<ProjectList>
  loading = true
  loaded = false
  currentPage = 1
  totalItems = 0
  subscriptions = new SubSink()
  loadedIds = []

  constructor(private projectListService: ProjectListEntityService) { }

  ngOnInit(): void {
    this.getProjectsByPage(0, true)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  pageChanged($event: any): void{
    const page = $event.page - 1
    this.getProjectsByPage(page)
  }

  getProjectsByPage(page: number, inIt?: boolean): void {
    this.loading = true
    this.projects$ = this.projectListService.entities$
    .pipe(
      map(projectList => projectList.find(list => list.pageNumber === page))
    )
    this.subscriptions.sink = this.projects$.subscribe(list => {
      if (list) {
      this.loading = false
      this.loadedIds.push(list.pageNumber)
      if (this.totalItems < list.projectCount) {
        this.totalItems = list.projectCount
        if (this.loaded === false) {
          this.loaded = true
        }
      }
      }
    })
    this.projectListService.getByKey(page)
  }

}
