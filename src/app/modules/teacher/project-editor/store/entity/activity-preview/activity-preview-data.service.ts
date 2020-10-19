import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ActivityPreview } from '../../../constants/model/activity-preview.model'

@Injectable()
export class ActivityPreviewDataService extends DefaultDataService<
  ActivityPreview
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private router: Router,
    private store: Store
  ) {
    super('ActivityPreview', http, httpUrlGenerator)
  }

  getById(id: any): Observable<ActivityPreview | any> {
    return this.http
      .get<ActivityPreview>(
        `${environment.apiUrl.projectService}/projects/activity/${id}`
      )
      .pipe(
        map((res) => res),
        catchError((err) => {
          this.errorHandler(err)
          return of(
            this.store.dispatch({
              type: '[Project] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        })
      )
  }
  errorHandler(error: HttpErrorResponse): any {
    if (error.status === 404) {
      this.router.navigate(['not-found'])
    }
  }
}
