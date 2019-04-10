import { BugService } from 'src/app/_services/bug.service';
import { ProjectService } from './../../_services/project.service';
import { Component, ViewChild, OnInit } from '@angular/core';
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

  private taskId: number;
  private bugId: number;

  private isArchiveActive: boolean = false;
  private bugOrTask: string;

  public taskList: any = [];
  public bugList: any = [];

  public archivedTaskList: any;


  
  public displayedColumns: string[] = ["name"];
  public dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private prjctService: ProjectService,
               private activatedRoute: ActivatedRoute, 
               private router: Router, 
               private bugService: BugService )
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
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
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

  //getting bugs
  getBugs()
  {
    this.bugService.getAllBugsByProjectId(this.projectId).subscribe(data => {
      this.bugList = data;
      this.addDataToSource(this.bugList);
    })
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
  navigateToTask(taskId: number)
  {
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
    let tasksComp: TasksComponent;
    if(event.checked)
    {
      this.prjctService.getArchivedTasksByProjectId(this.projectId).subscribe(data => {
        this.isArchiveActive = true;
        tasksComp.changeArchiveStatus(true);
        this.taskList = data;
        this.addDataToSource(this.taskList);
      });
    }
    else
    {
      this.isArchiveActive = false;
      tasksComp.changeArchiveStatus(false);
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
