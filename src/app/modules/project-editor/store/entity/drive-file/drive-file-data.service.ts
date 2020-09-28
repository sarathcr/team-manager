import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { DriveFileStoreData } from 'src/app/shared/constants/model/google-drive.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class DriveFileDataService extends DefaultDataService<
  DriveFileStoreData
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('DriveFile', http, httpUrlGenerator)
  }

  getById(query: any): Observable<DriveFileStoreData[] | any> {
    return this.http
      .get<DriveFileStoreData[]>(
        `${environment.apiUrl.projectService}/drive/${query}`
      )
      .pipe(
        map((response) => ({
          id: query,
          fileList: response,
        })),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[DriveFile] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
