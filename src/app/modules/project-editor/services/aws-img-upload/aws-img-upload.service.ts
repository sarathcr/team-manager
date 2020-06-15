import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsImgUploadService {
  constructor(private http: HttpClient) {
  }

  uploadImg(mime, path): Observable<any> {
    // console.log(parm,"<==== uploadImg")
    let body = {
      FilePath: path,
      MimeType: mime
      // MimeType: mime
    }
    return this.http.post<any>(`http://api.dev.abp.thinkoeducation.com/uploads/`, JSON.stringify(body))
      .pipe(
        map(res => res)
      );
    
  }
  upload(res, img, mim): Observable<any> {
    var formData = new FormData();
    formData.append('image', img);
    var options = { headers: new HttpHeaders().set('Content-Type', mim) };

    return this.http.put<any>( res.uploadURL, formData, options)
    .pipe(
      map(re => {
        console.log(res, "rth ====")
      })
    );
  }

}
