import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectEntityService } from '../../services/project/project-entity.service';
import { Project } from 'src/app/shared/constants/project.model';
import { tap, filter, first } from 'rxjs/operators';

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
