import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BugService 
{

  myUrl: string;

  constructor(private http: HttpClient) 
  {
    this.myUrl = location.origin;
  }

  //Přidání bugu k projektu
  saveBug(bug) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/Bug/Create', bug, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Aktualizace bugu
  editBug(bug, id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    bug.Id = id;
    return this.http.put(this.myUrl + '/api/Bug/Edit', bug, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Aktualizace statusu u bugu
  editBugStatus(status: string, id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    var data = {status: status, id: id};
    return this.http.put(this.myUrl + '/api/Bug/EditStatus/', data, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
  
  //Smazání bugu
  deleteBug(id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Bug/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání bugu podle id projektu
  getBug(bugId: number) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Bug/Fetch/' + bugId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání bugů
  getAllBugsByProjectId(prjctId: number) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Bug/FetchAll/' + prjctId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
