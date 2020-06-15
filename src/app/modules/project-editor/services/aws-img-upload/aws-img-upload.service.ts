import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsImgUploadService {
  constructor(private http: HttpClient) {
  }

  uploadImg(): Observable<any> {
    // console.log(parm,"<==== uploadImg")
    let body = {
      FilePath: "src/assets/images/150.png",
      MimeType: "image/png"
    }
    return this.http.post<any>(`http://api.dev.abp.thinkoeducation.com/uploads/`, JSON.stringify(body))
      .pipe(
        map(res => {
          console.log(res, "<=====")
        })
      );
    
  }
}
