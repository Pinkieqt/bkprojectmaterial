import { ProjectService } from './../../_services/project.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent
{
  private projectId: number;
  private taskId: number;
  private isArchiveActive: boolean = false;
  public taskList: any = [];
  public archivedTaskList: any;


  
  public displayedColumns: string[] = ["name"];
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private prjctService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router, private prjctComp: ProjectComponent )
  {
    

    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['id'];
      this.taskId = params['taskId'];
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        //Při změne task id url načte znova tasky
        if(!this.isArchiveActive)
          this.getTasks();
        else
          this.getArchivedTasks();
      }
    })
  }
  //Not archived tasks
  getTasks()
  {
    this.prjctService.getAllTasksByProjectId(this.projectId).subscribe(data => {
      this.taskList = data;
      this.addDataToSource(this.taskList);
    });
  }

  //Not archived tasks
  getArchivedTasks()
  {
    this.prjctService.getArchivedTasksByProjectId(this.projectId).subscribe(data => {
      this.taskList = data;
      this.addDataToSource(this.taskList);
    });
  }

  //Přepnout na task
  navigateToTask(id: number)
  {
    this.router.navigate(["/project/" + this.projectId + "/" + id]);
  }

  //Get archived tasks
  //Checkbutton event
  checkValue(event)
  {
    if(event.checked)
    {
      this.prjctService.getArchivedTasksByProjectId(this.projectId).subscribe(data => {
        this.isArchiveActive = true;
        this.prjctComp.changeArchiveStatus(true);
        this.taskList = data;
        this.addDataToSource(this.taskList);
      });
    }
    else
    {
      this.prjctComp.changeArchiveStatus(false);
      this.isArchiveActive = false;
      this.taskList = [];
      this.getTasks();
    }
 }

 addDataToSource(taskList: any){
  this.dataSource = new MatTableDataSource<TaskData>(taskList);
  this.dataSource.paginator = this.paginator;
  this.paginator._changePageSize(10);
 }
}

export interface TaskData {
  name: string;
}
