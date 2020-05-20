import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/constants/project.model';
import { ProjectEntityService } from '../../services/project-entity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  title:string = 'Tus plantillas';
  projects$: Observable<Project[]>;

  constructor(
    private projectsService: ProjectEntityService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.projects$ = this.projectsService.entities$
  }

}
