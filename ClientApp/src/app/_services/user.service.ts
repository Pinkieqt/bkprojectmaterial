import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserService 
{

  myUrl: string;

  constructor(private http: HttpClient) 
  {
    this.myUrl = location.origin;
  }

  //Získání uživatelů
  getUsers() : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/User/Fetch', { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }


  //Získání uživatele podle jeho loginu
  getUserByLogin(login) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/User/FetchByLogin/' + login, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Smazání uživatele
  deleteUser(id) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/User/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }


  //Přidání uživatele
  saveUser(user)  : Observable<Object>
  {
      const token = localStorage.getItem("jwt");
      return this.http.post(this.myUrl + '/api/User/Create', user, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //aktualizace uživatele
  editUserx(user)  : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/User/Edit', user, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Aktulizace emailového statusu u uživatele
  editUserEmailStatus(user)  : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/User/EditEmailStatus', user, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
