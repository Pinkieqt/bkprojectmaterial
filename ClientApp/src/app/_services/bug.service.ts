import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BugService {

  myUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = location.origin;
  }

  //Adding task to project
  saveBug(bug)
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/Bug/Create', bug, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Editing task
  editBug(bug, id: number) 
  {
    const token = localStorage.getItem("jwt");
    bug.Id = id;
    return this.http.put(this.myUrl + '/api/Bug/Edit', bug, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Editing task
  editBugStatus(status: string, id: number) 
  {
    const token = localStorage.getItem("jwt");
    var data = {status: status, id: id};
    return this.http.put(this.myUrl + '/api/Bug/EditStatus/', data, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
  
  //Deleting task
  deleteBug(id) 
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Bug/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching one bug by its id
  getBug(bugId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Bug/Fetch/' + bugId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching bugs based on projectid
  getAllBugsByProjectId(prjctId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Bug/FetchAll/' + prjctId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
