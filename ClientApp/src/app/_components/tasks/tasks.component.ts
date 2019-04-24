import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { Component, Inject, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/_services/comment.service';
import { DialogAddTask } from './dialogAddTask.component';
import { DialogEditTask } from './dialogEditTask.component';
import { AlertComponent } from '../layout/alert/alert.component';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnDestroy
{
  ngOnDestroy(): void {
    this.taskId = undefined;
    this.router = undefined;
  }

  private projectId: number;
  private taskId: number;
  private isOwner: boolean;
  private isArchiveActived: boolean = false;
  private loggedUserId: number = parseInt(localStorage.getItem("userId"));
  public tmpProject: any;
  public tmpTask: any;
  public tmpCommentsList: any;
  private _commentForm: FormGroup;
  private myData: any;



  constructor
  ( 
    private prjctService: ProjectService,
    private taskService: TaskService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this._commentForm = this.formBuilder.group
    ({
      Content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      TimeChanged: [''],
      Fk_Owner_Id: [''],
      Fk_Task_Id: ['']
    })

    var tmpEvent = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        this.activatedRoute.params.subscribe(params => {
          this.projectId = params['id'];
          this.taskId = params['taskId'];
          //Ziskani informaci o projektu
          this.getProjectInfo();
  
          //Ziskani daného úkolu z projektu
          if(!this.isArchiveActived)
          {
            this.getTask(this.taskId);
            this.getComments(this.taskId);
          }
          else
          {
            this.getArchivedTask(this.taskId);
            this.getArchiveComments(this.taskId);
          }

          //Ziskani komentářů k danému úkolu

        })
        tmpEvent.unsubscribe();
      }
    })
  }

  getProjectInfo()
  {
    this.prjctService.getProjectByItsId(this.projectId).subscribe(data => {
        this.tmpProject = data;
        if (this.tmpProject.owner_Id == this.loggedUserId) this.isOwner = true;
        else this.isOwner = false;
      });
  }

  deleteProject(prjctId: number)
  {
    this.prjctService.deleteProject(prjctId).subscribe(data => {
      confirm
    })
    var confirmAnswer = confirm("Jste si jistí, že chcete daný projekt a přiřazené úkoly a bugy smazat?");
    if (confirmAnswer) 
    {
      this.prjctService.deleteProject(prjctId).subscribe((data) => 
      {
        this.router.navigate(["/"]);
        this.snackBar.open("Projekt byl úspěšně smazán z databáze.", null, {duration: 2000});
      },
      error => {
        this.errorHandle(error);
      })
    } 
  }

  changeArchiveStatus(bit: boolean){
    this.isArchiveActived = bit;
  }

  getTask(taskId: number)
  {
    this.taskService.getTask(taskId).subscribe(data => {
      if(data)
      {
        this.tmpTask = data[0];
      }
    }, error => {
      this.tmpTask = [];
    })
  }

  getArchivedTask(taskId: number)
  {
    this.taskService.getArchivedTask(taskId).subscribe(data => {
      if(data)
      {
        this.tmpTask = data[0];
      }
    }, error => {
      this.tmpTask = [];
    })
  }

  //Metoda pro odstranění tasku
  deleteTask(){
    var confirmAnswer = confirm("Jste si jistí, že chcete smazat úkol s názvem \"" + this.tmpTask.name + "\" a ID \"" + this.tmpTask.id + "\"?");
    if (confirmAnswer) 
    {
      this.taskService.deleteTask(this.tmpTask.id).subscribe(data => 
      {
        this.router.navigate(["/project/tasks/" + this.projectId]);
        this.snackBar.open("Úkol byl smazán z projektu.", null, {duration: 2000});
      },
      error => {
        this.errorHandle(error);
      })
    } 
  }

  //Method for archiving a task
  archiveTask()
  {
    var confirmAnswer = confirm("Jste si jistí, že chcete archivovat úkol s názvem \"" + this.tmpTask.name + "\" a ID \"" + this.tmpTask.id + "\"?");
    if (confirmAnswer) 
    {
      this.taskService.archiveTask(this.tmpTask.id).subscribe(data => 
      {
        this.router.navigate(["/project/tasks/" + this.projectId]);
        this.snackBar.open("Úkol byl archivován.", null, {duration: 2000});
      }, error => {
        this.errorHandle(error);
      });
    }
  }

  //Status change
  onChangeTask(value){
    this.taskService.editTaskStatus(value, this.tmpTask.id).subscribe(result => {
      this.snackBar.open("Status úkolu byl úspěšně změnen.", null, {duration: 2000});
    }, error => {
      this.errorHandle(error);
    });
  }
  
  //Metoda pro zobrazení dialogu pro přidání úkolu
  openAddTaskDialog(): void {
    this.dialog.open(DialogAddTask, {
      width: '30%',
      data: {projectId: this.projectId, ownerId: this.loggedUserId, assigned: this.tmpProject.assigned}
    });
  }

  //Metoda pro zobrazení dialogu pro přidání úkolu
  openEditTaskDialog(p_id: number, p_name: string, p_description: string, p_priority: string, p_labels: string): void {
    const dialogRef = this.dialog.open(DialogEditTask, {
      width: '30%',
      data: {id: p_id, name: p_name, description: p_description, priority: p_priority, labels: p_labels, projectId: this.projectId, ownerId: this.loggedUserId, assigned: this.tmpProject.assigned}
    });

    dialogRef.afterClosed().subscribe(result => {
      //Ziskani daného úkolu z projektu
      this.getTask(this.taskId);
    });
  }

  //comment adding
  addComment()
  {
    if (!this._commentForm.valid)
    {
      alert("Pro přidání komentáře je potřeba zadat nějaký text.");
      return;
    }
    this._commentForm.controls['TimeChanged'].setValue(Date.now);
    this._commentForm.controls['Fk_Owner_Id'].setValue(this.loggedUserId);
    this._commentForm.controls['Fk_Task_Id'].setValue(this.taskId);
    this.commentService.saveComment(this._commentForm.value).subscribe((data) => 
    {
      this.getComments(this.taskId);
    }, error => { 
      this.errorHandle(error);
    })
  }

  //comment adding
  deleteComment(commentId: number)
  {
    if(confirm("Jste si jistí, že chcete smazat tento komentář?"))
    {
      this.commentService.deleteComment(commentId).subscribe(result => {
        if (result == 1)
        {
          this.snackBar.open("Komentář byl smazán.", null, {duration: 2000});
          this.getComments(this.taskId);
        }
      }, error => {
        this.errorHandle(error);
      })
    }
    
  }

  //ziskani komentařů k danému ukolu
  getComments(taskId: number)
  {
    if(taskId != undefined)
    {
      this.commentService.getComments(taskId).subscribe((data) => 
      {
        this.tmpCommentsList = data;
      })
    }
  }

  //ziskani archiv komentařů k danému ukolu
  getArchiveComments(taskId: number)
  {
    if(taskId != undefined)
    {
      this.commentService.getArchivedComments(taskId).subscribe((data) => 
      {
        this.tmpCommentsList = data;
      })
    }
  }

  errorHandle(error: any)
  {
    //Unauthorized - uživatel nemá povolení to udělat
    if(error.status == 401 || error.status == 403)
    {
      this.dialog.open(AlertComponent, {
        width: '30%'
      });
    }
    else
    this.snackBar.open("Vyskytla se chyba. Zkuste opakovat svůj požadavek později.", null, {duration: 2000});
  }
}


