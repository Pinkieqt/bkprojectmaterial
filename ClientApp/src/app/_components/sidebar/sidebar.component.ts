import { TaskService } from './../../_services/task.service';
import { BugService } from 'src/app/_services/bug.service';
import { ProjectService } from './../../_services/project.service';
import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent
{
  private projectId: number;
  private bugOrTask: string;

  private taskId: number;
  private bugId: number;

  private labelsArray: string[];
  private isArchiveActive: boolean = false;

  public taskList: any = [];
  public bugList: any = [];

  public archivedTaskList: any;

  public displayedColumns: string[] = ["name"];
  public dataSource: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor( 
              private taskComp: TasksComponent,
              private prjctService: ProjectService,
              private taskService: TaskService,
              private activatedRoute: ActivatedRoute, 
              private router: Router, 
              private bugService: BugService )
  {
    var tmpEvent = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        this.activatedRoute.params.subscribe(params => {
          if (this.router.url.indexOf('/bugs/') > -1) {
            this.bugOrTask = "bugs";
            this.bugId = params['bugId'];
          }
          else if (this.router.url.indexOf('/tasks/') > -1) {
            this.bugOrTask = "tasks";
            this.taskId = params['taskId'];
          }
          this.projectId = params['id'];
          
          //Při změne task id url načte znova tasky
          if(this.bugOrTask == "bugs")
          {
            this.getBugs();
          }
          if(this.bugOrTask == "tasks")
          {
            if(!this.isArchiveActive)
              this.getTasks();
            else
              this.getArchivedTasks();
          }
        })
        tmpEvent.unsubscribe();
      }
    })
  }
  //Not archived tasks
  getTasks()
  {
    this.taskService.getAllTasksByProjectId(this.projectId).subscribe(data => {
      this.taskList = data;
      if(this.taskList.length > 0 && (this.taskId == null || this.taskId == undefined)) this.router.navigate(["/project/tasks/" + this.projectId + "/" + this.taskList[0].id]);
      this.addDataToSource(this.taskList);
    });
  }

  //getting bugs
  getBugs()
  {
    this.bugService.getAllBugsByProjectId(this.projectId).subscribe(data => {
      this.bugList = data;
      if(this.bugList.length > 0 && (this.bugId == null || this.bugId == undefined)) this.router.navigate(["/project/bugs/" + this.projectId + "/" + this.bugList[0].id]);
      this.addDataToSource(this.bugList);
    })
  }

  //Not archived tasks
  getArchivedTasks()
  {
    this.taskService.getArchivedTasksByProjectId(this.projectId).subscribe(data => {
      this.taskList = data;
      this.addDataToSource(this.taskList);
    });
  }

  //Přepnout na task
  navigateToTask(taskId: number)
  {
    //this.transfer.setData(this.projectId);
    this.router.navigate(["/project/tasks/" + this.projectId + "/" + taskId]);
  }

  //Přepnout na bug
  navigateToBug(bugId: number)
  {
    this.router.navigate(["/project/bugs/" + this.projectId + "/" + bugId]);
  }

  //Get archived tasks
  //Checkbutton event
  checkValue(event)
  {
    if(event.checked)
    {
      this.taskService.getArchivedTasksByProjectId(this.projectId).subscribe(data => {
        this.isArchiveActive = true;
        this.taskComp.changeArchiveStatus(true);
        this.taskList = data;
        this.addDataToSource(this.taskList);
      });
    }
    else
    {
      this.isArchiveActive = false;
      this.taskComp.changeArchiveStatus(false);
      this.taskList = [];
      this.getTasks();
    }
 }

 addDataToSource(dataList: any){
  this.dataSource = new MatTableDataSource<Data>(dataList);
  this.dataSource.paginator = this.paginator;
  this.paginator._changePageSize(10);
 }
}

export interface Data {
  name: string;
}
