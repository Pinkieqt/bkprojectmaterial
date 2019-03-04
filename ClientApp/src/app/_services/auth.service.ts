import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthorizationService {

  myUrl: string;

  constructor(
    private Jwthelper: JwtHelper,
    private http: Http,
    @Inject('BASE_URL') baseUrl: string
  ){
    this.myUrl = baseUrl;
  }
  
  loginUser(loginmodel)
  {
    return this.http.post(this.myUrl + 'api/User/Login', loginmodel)
      .map((response: Response) => response.json())
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    if (token == null)
    {
      return false;
    }
    return !this.Jwthelper.isTokenExpired(token);
  }

  logout() {
    localStorage.clear();
  }

}
