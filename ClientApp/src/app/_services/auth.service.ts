import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService 
{

  myUrl: string;
  public helper = new JwtHelperService();

  constructor(private http: HttpClient)
  {
    this.myUrl = location.origin;
  }
  
  //Ověření a přihlášení uživatele
  loginUser(loginmodel) : Observable<Object>
  {
    return this.http.post(this.myUrl + '/api/User/Login', loginmodel)
      .pipe(map(data => 
        {
          if(data)
            return data;
      }))
  }

  //Metoda pro kontrolu JWT tokenu
  public isLoggedIn(): boolean 
  {
    const token = localStorage.getItem('jwt');
    if (token == null)
    {
      return false;
    }
    return !this.helper.isTokenExpired(token);
  }

  //Metoda pro odhlášení uživatele a smazání všeho co zanechal v úložišti uživatele
  logout() 
  {
    localStorage.clear();
  }

}
