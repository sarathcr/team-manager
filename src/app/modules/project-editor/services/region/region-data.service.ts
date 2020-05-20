import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Region } from 'src/app/shared/models/region.model';

@Injectable()
export class RegionDataService extends DefaultDataService<Region> {
    countryId: number;
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Region', http, httpUrlGenerator);

    }
    setParam(param){
      this.countryId = param;
    }
    getAll(): Observable<Region[]> {

      return this.http.get<Region[]>(`${environment.apiUrl}/countries/${this.countryId}/regions`)
          .pipe(
              map(res => res)
          );
    }
}
