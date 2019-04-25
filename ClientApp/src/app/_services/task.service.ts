import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService 
{

  myUrl: string;

  constructor(private http: HttpClient) 
  {
    this.myUrl = location.origin;
  }

  //Přidání úkolu
  saveTask(tsk) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.post(this.myUrl + '/api/Task/Create', tsk, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Aktualizace úkolu
  editTask(tsk, id: number) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    tsk.Id = id;
    return this.http.put(this.myUrl + '/api/Task/Edit', tsk, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Aktualizace statusu u úkolu
  editTaskStatus(status: string, id: number) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    var data = {status: status, id: id};
    return this.http.put(this.myUrl + '/api/Task/EditStatus/', data, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
  
  //Smazání úkolu
  deleteTask(id) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Task/Delete/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Archivování úkolu
  archiveTask(id) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.delete(this.myUrl + '/api/Task/Archive/' + id, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání úkolu podle jeho id
  getTask(taskId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/Fetch/' + taskId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání archivovaných úkolu pomocí jeho id
  getArchivedTask(taskId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/FetchArchivedTask/' + taskId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání úkolu pomocí id projektu
  getAllTasksByProjectId(prjctId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/FetchAll/' + prjctId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }

  //Získání archivovaných úkolu pomocí id projektu
  getArchivedTasksByProjectId(prjctId) : Observable<Object>
  {
    const token = localStorage.getItem("jwt");
    return this.http.get(this.myUrl + '/api/Task/FetchArchived/' + prjctId, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) })
      .pipe(map(res => res));
  }
}
