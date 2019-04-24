import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentService {

  myUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = location.origin;
  }

  /*
  
    Comment task

  */
  //Inserting comment to task
  saveComment(cmnt) {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/TaskComment/Create', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching comments by taskid id
  getComments(id: number) {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/TaskComment/GetAllComments/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching comments by taskid id
  getArchivedComments(id: number) {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/TaskComment/GetAllArchivedComments/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Deleting comment
  deleteComment(id: number) {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/TaskComment/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Editing comment
  editComment(cmnt) {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/TaskComment/Edit', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  /*
  
    Comment bug

  */
  //Inserting comment to task
  saveBugComment(cmnt) {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/BugComment/Create', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching comments by taskid id
  getBugComments(id: number) {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/BugComment/GetAllComments/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Deleting comment
  deleteBugComment(id: number) {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/BugComment/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Editing comment
  editBugComment(cmnt) {
    const token = localStorage.getItem("jwt");
    return this.http.put(this.myUrl + '/api/BugComment/Edit', cmnt, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
