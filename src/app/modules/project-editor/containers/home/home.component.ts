import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Project } from 'src/app/modules/project-editor/constants/project.model'
import { tap, filter, first } from 'rxjs/operators'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  title: string = 'Tus plantillas';
  projects$: Observable<Project[]>;
  loaded: boolean
  constructor(private projectsService: ProjectEntityService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.projects$ = this.projectsService.entities$
    this.projectsService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.projectsService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      )
      .subscribe(res => this.loaded = res)
  }

}
