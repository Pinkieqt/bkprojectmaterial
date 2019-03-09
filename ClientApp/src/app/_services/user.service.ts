import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  myUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = location.origin;
  }

  //Fetching user
  getUsers() {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/User/Fetch', { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }


  //Getting user by login
  getUserByLogin(login) {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/User/FetchByLogin/' + login, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Deleting user
  deleteUser(login) {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/User/Delete/' + login, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }


  //Adding user
  saveUser(user) {
      const token = localStorage.getItem("jwt");
      return this.http.post(this.myUrl + '/api/User/Create', user, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }


  //Editing user
  editUserx(user) {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/User/Edit', user, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
