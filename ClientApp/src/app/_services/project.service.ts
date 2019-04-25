import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService 
{

  myUrl: string;

  constructor(private http: HttpClient) 
  {
    this.myUrl = location.origin;
  }

  //Přidání projektu
  saveProject(prjct) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/Project/Create', prjct, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání projektu podle uživatele
  getProjectsByUserId(userId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Project/Fetch/' + userId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání projektu podle uživatelského id
  getProjectsByParticipantUserId(userId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Project/FetchByParticipant/' + userId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání projektu podle jeho Id
  getProjectByItsId(projectId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Project/FetchByProjectId/' + projectId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Smazání projektu
  deleteProject(projectId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Project/Delete/' + projectId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
