import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskService {

  myUrl: string;

  constructor(private http: HttpClient) {
    this.myUrl = location.origin;
  }
  saveTask(tsk)
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/Task/Create', tsk, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Editing task
  editTask(tsk, id: number) 
  {
    const token = localStorage.getItem("jwt");
    tsk.Id = id;
    return this.http.put(this.myUrl + '/api/Task/Edit', tsk, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Editing task
  editTaskStatus(status: string, id: number) 
  {
    const token = localStorage.getItem("jwt");
    var data = {status: status, id: id};
    return this.http.put(this.myUrl + '/api/Task/EditStatus/', data, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
  
  //Deleting task
  deleteTask(id) 
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Task/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Archiving task
  archiveTask(id)
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Task/Archive/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching one task by its id
  getTask(taskId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/Fetch/' + taskId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching archived tasks based on project id
  getArchivedTask(taskId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/FetchArchivedTask/' + taskId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching tasks based on projectid
  getAllTasksByProjectId(prjctId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/FetchAll/' + prjctId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Fetching archived tasks based on project id
  getArchivedTasksByProjectId(prjctId)
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/FetchArchived/' + prjctId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
