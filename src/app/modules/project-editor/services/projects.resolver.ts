import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEntityService } from './project-entity.service';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable()
export class ProjectsResolver implements Resolve<boolean> {

    constructor(private projectsService: ProjectEntityService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.projectsService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.projectsService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }

}