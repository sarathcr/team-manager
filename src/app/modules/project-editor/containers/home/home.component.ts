import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { tap, filter, first } from 'rxjs/operators'

import { Project } from 'src/app/modules/project-editor/constants/model/project.model'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'Tus plantillas'
  projects$: Observable<Project[]>
  loaded: boolean
  subscriptions = new SubSink()

  constructor(private projectsService: ProjectEntityService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getAll(): void {
    this.projects$ = this.projectsService.entities$
    this.subscriptions.sink = this.projectsService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.projectsService.getAll()
          }
        }),
        filter(loaded => !!loaded),
        first()
      )
      .subscribe(res => this.loaded = res)
  }

}
