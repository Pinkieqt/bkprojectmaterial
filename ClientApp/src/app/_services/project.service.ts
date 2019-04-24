import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectService {

  myUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = location.origin;
  }

  //Adding project
  saveProject(prjct) {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/Project/Create', prjct, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching projects based on login
  getProjectsByUserId(userId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Project/Fetch/' + userId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching projects based on participant login
  getProjectsByParticipantUserId(userId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Project/FetchByParticipant/' + userId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching one project info based on its id
  getProjectByItsId(projectId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Project/FetchByProjectId/' + projectId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Deleting project
  deleteProject(projectId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Project/Delete/' + projectId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
