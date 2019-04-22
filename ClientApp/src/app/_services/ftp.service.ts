import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var require: any

@Injectable()
export class FtpService {

  myUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = location.origin;
  }


  //Upload file
  uploadFile(file: File) {
    const token = localStorage.getItem("jwt");
    console.log(file);

    const myData: FormData = new FormData();
    myData.append("hmm", file, file.name );

    

    return this.http.post(this.myUrl + '/api/Ftp/Upload', myData, { headers: new HttpHeaders({ "Authorization": "Bearer " + token}) })
       .pipe(map(res => res));
  }

}