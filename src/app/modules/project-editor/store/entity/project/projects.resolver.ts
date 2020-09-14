import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { filter, first, tap } from 'rxjs/operators'
import { ProjectEntityService } from './project-entity.service'

@Injectable()
export class ProjectsResolver implements Resolve<boolean> {
  constructor(private projectsService: ProjectEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.projectsService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.projectsService.getAll()
        }
      }),
      filter((loaded) => !!loaded),
      first()
    )
  }
}
