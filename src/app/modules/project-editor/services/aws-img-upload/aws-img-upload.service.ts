import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsImgUploadService {
  constructor(private http: HttpClient) {
  }

  GetRreSignedUrl(MimeType: object, FilePath: string): Observable<any> {
    return this.http.post<any>(`http://api.dev.abp.thinkoeducation.com/uploads/`, JSON.stringify({FilePath, MimeType}))
  }

  uploadImage(uploadURL: string, file: any): Observable<any> {
    return this.http.put<any>( uploadURL, file)
  }

}
