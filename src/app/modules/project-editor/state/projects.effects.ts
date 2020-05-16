import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectEditorActions } from './projects-action-types';
import { ProjectsHttpService } from './../services/projects-http.service';
import { concatMap, map } from 'rxjs/operators';
import { allProjectsLoaded } from './projects.actions';


@Injectable()
export class ProjectsEffects {

    loadCourses$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ProjectEditorActions.loadAllProjects),
                concatMap(action =>
                    this._projectsHttpService.findAllProjects()),
                map(project => allProjectsLoaded({ project }))
            )
    );


    // saveCourse$ = createEffect(
    //     () => this.actions$
    //         .pipe(
    //             ofType(ProjectEditorActions.courseUpdated),
    //             concatMap(action => this._projectsHttpService.saveProject(
    //                 action.update.id,
    //                 action.update.changes
    //             ))
    //         ),
    //     { dispatch: false }
    // );

    constructor(private actions$: Actions,
        private _projectsHttpService: ProjectsHttpService) {

    }

}