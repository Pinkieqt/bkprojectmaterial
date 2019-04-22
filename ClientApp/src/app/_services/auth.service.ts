import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthorizationService {

  myUrl: string;
  public helper = new JwtHelperService();

  constructor(
    private http: HttpClient
  ){
    this.myUrl = location.origin;
  }
  
  loginUser(loginmodel)
  {
    return this.http.post(this.myUrl + '/api/User/Login', loginmodel)
      .pipe(map(data => 
        {
          if(data)
            return data;
      }))
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    if (token == null)
    {
      return false;
    }
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    localStorage.clear();
  }

}
