import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CommentService 
{

  myUrl: string;

  constructor(private http: HttpClient) 
  {
    this.myUrl = location.origin;
  }

  /*
  
    Komentáře úkolu

  */

  //Přidání komentáře k úkolu
  saveComment(cmnt) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/TaskComment/Create', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Ziskání komentářů podle id úkolu
  getComments(id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/TaskComment/GetAllComments/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání archivních komentářů podle id úkolu
  getArchivedComments(id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/TaskComment/GetAllArchivedComments/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Smazání komentáře podle jeho id
  deleteComment(id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/TaskComment/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //UNUSED
  //aktualizace komentáře
  editComment(cmnt) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/TaskComment/Edit', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  /*
  
    Komentáře bugu

  */
  //Přidání komentáře k bugu
  saveBugComment(cmnt) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/BugComment/Create', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //získání komentářů podle id bugu
  getBugComments(id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/BugComment/GetAllComments/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Smazáni komentáře
  deleteBugComment(id: number) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/BugComment/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //UNUSED
  //aktualizace komentáře
  editBugComment(cmnt) : Observable<Object> 
  {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/BugComment/Edit', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
