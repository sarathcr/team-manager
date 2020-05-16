import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectsState} from './project.reducers';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {loadAllProjects} from './projects.actions';
import { areProjectsLoaded } from './projects.selectors';


@Injectable()
export class ProjectsResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<ProjectsState>) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(areProjectsLoaded),
                tap(projectsLoaded => {
                    if (!this.loading && !projectsLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllProjects());
                    }
                }),
                filter(projectsLoaded => projectsLoaded),
                first(),
                finalize(() => this.loading = false)
            );

    }

}