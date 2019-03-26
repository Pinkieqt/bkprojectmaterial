import { ProjectService } from './../../_services/project.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent
{
  private projectId: number;
  private taskId: number;
  public taskList: any;
  public archivedTaskList: any;

  constructor( private prjctService: ProjectService, private activatedRoute: ActivatedRoute, private router: Router )
  {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['id'];
      this.taskId = params['taskId'];
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        //Při změne task id url načte znova tasky
        this.getTasks();
      }
    })
  }

  //Not archived tasks
  getTasks()
  {
    this.prjctService.getAllTasksByProjectId(this.projectId).subscribe(data => this.taskList = data);
  }

  //Not archived tasks
  getArchivedTasks()
  {
    this.prjctService.getArchivedTasksByProjectId(this.projectId).subscribe(data => this.taskList = data);
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
        this.archivedTaskList = data;
        console.log(this.archivedTaskList);
      });
    }
    else
    {
      this.archivedTaskList = [];
    }
 }
}
