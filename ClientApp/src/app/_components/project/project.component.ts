import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ProjectService } from './../../_services/project.service';
import { Component, Inject } from '@angular/core';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent
{
  private projectId: number;
  private taskId: number;
  private isOwner: boolean;
  private loggedUserId: number = parseInt(localStorage.getItem("userId"));
  public tmpProject: any;
  public tmpTask: any;
  public tmpCommentsList: any;
  private _commentForm: FormGroup;

  constructor( 
    private prjctService: ProjectService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    )
  {
    this._commentForm = this.formBuilder.group
    ({
      Content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      TimeChanged: [''],
      Fk_Owner_Id: [''],
      Fk_Task_Id: ['']
    })
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {

        this.activatedRoute.params.subscribe(params => {
          this.projectId = params['id'];
          this.taskId = params['taskId'];
          //Ziskani informaci o projektu
          this.getProjectInfo();
  
          //Ziskani daného úkolu z projektu
          this.getTask(this.taskId);
          //this.getArchivedTask(this.taskId);

          //Ziskani komentářů k danému úkolu
          this.getComments(this.taskId);
        })
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

  getTask(taskId: number)
  {
    this.prjctService.getTask(taskId).subscribe(data => {
      if(data)
      {
        this.tmpTask = data[0];
      }
    }, error => {
      this.tmpTask = "error";
    })
  }

  getArchivedTask(taskId: number)
  {
    this.prjctService.getArchivedTask(taskId).subscribe(data => {
      if(data)
      {
        this.tmpTask = data[0];
      }
    }, error => {
      this.tmpTask = "error";
    })
  }

  //Metoda pro odstranění tasku
  deleteTask(){
    var confirmAnswer = confirm("Jste si jistí, že chcete smazat úkol s názvem \"" + this.tmpTask.name + "\" a ID \"" + this.tmpTask.id + "\"?");
    if (confirmAnswer) 
    {
      this.prjctService.deleteTask(this.tmpTask.id).subscribe((data) => 
      {
        this.router.navigate(["/project/" + this.projectId]);
        this.snackBar.open("Úkol byl smazán z projektu.", null, {duration: 2000});
      },
      error => {

      })
    } 
  }

  //Method for archiving a task
  archiveTask()
  {
    var confirmAnswer = confirm("Jste si jistí, že chcete archivovat úkol s názvem \"" + this.tmpTask.name + "\" a ID \"" + this.tmpTask.id + "\"?");
    if (confirmAnswer) 
    {
      this.prjctService.archiveTask(this.tmpTask.id).subscribe((data) => 
      {
        alert("Úkol byl archivován.");
        //this.getUsers();
      },
      error => console.error(error))
    } 
  }

  //Status change
  onChangeTask(value){
    this.prjctService.editTaskStatus(value, this.tmpTask.id).subscribe(result => {
      
    });
  }
  
  //Metoda pro zobrazení dialogu pro přidání úkolu
  openAddTaskDialog(): void {
    this.dialog.open(DialogAddTask, {
      width: '30%',
      data: {projectId: this.projectId, ownerId: this.loggedUserId}
    });
  }

  //Metoda pro zobrazení dialogu pro přidání úkolu
  openEditTaskDialog(p_id: number, p_name: string, p_description: string, p_priority: string, p_labels: string): void {
    const dialogRef = this.dialog.open(DialogEditTask, {
      width: '30%',
      data: {id: p_id, name: p_name, description: p_description, priority: p_priority, labels: p_labels, projectId: this.projectId, ownerId: this.loggedUserId}
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
    }, error => 
    { 
      console.log(error);
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
        alert("Problém se smazáním komentáře");
      })
    }
    
  }

  //ziskani komentařů k danému ukolu
  getComments(taskID: number)
  {
    this.commentService.getComments(taskID).subscribe((data) => 
    {
      this.tmpCommentsList = data;
    })
  }
}


/*
  Komponent pro přidání úkolu k projektu - dialog

  + interface pro editační data
*/
@Component({
  selector: 'dialog-add-task',
  templateUrl: './add-task-dialog.html',
  styleUrls: ['./project.component.css']
})
export class DialogAddTask {
  
  private tmpTask: AddTaskData;
  private taskForm: FormGroup;

  constructor(
    private prjctService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddTask>,
    @Inject(MAT_DIALOG_DATA) public data: AddTaskData) {
      this.taskForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
        Fk_Owner_Id: [''],
        Fk_Project_Id: [''],
        priority: ['', [Validators.required]],
        labels: ['', [Validators.required]],
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(ownerId: number, projectId: number): void {
    if (!this.taskForm.valid) {
      this.snackBar.open("Formulář pro přidání úkolu k projektu je neplatný.", null, {duration: 2000});
      return;
    }
    this.taskForm.controls['Fk_Owner_Id'].setValue(ownerId);
    this.taskForm.controls['Fk_Project_Id'].setValue(projectId);
    this.prjctService.saveTask(this.taskForm.value).subscribe(data => {
      this.dialogRef.close();
      this.router.navigate(["project/" + projectId + "/" + data]);
      this.snackBar.open("Úkol byl vytvořen a přiřazen k projektu.", null, {duration: 2000});
    }, error => {
      alert("Problém při vytváření úkolu k projektu.")
    })
  }
}

export interface AddTaskData {
  name: string;
  description: string;
  projectId: number;
  ownerId: number;
  priority: string;
  labels: string;
}

/*
  Komponent pro editaci úkolu u projektu - dialog

  + interface pro editační data
*/
@Component({
  selector: 'dialog-edit-task',
  templateUrl: './edit-task-dialog.html',
  styleUrls: ['./project.component.css']
})
export class DialogEditTask {
  
  private tmpTask: AddTaskData;
  private taskForm: FormGroup;

  constructor(
    private prjctService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddTask>,
    @Inject(MAT_DIALOG_DATA) public data: AddTaskData) {
      this.taskForm = this.formBuilder.group({
        Id: [''],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
        Fk_Owner_Id: [''],
        Fk_Project_Id: [''],
        priority: ['', [Validators.required]],
        labels: ['', [Validators.required]],
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(ownerId: number, projectId: number, taskId: number): void {
    if(!this.taskForm.valid)
    {
      this.snackBar.open("Formulář pro editaci úkolu je neplatný.", null, {duration: 2000});
      return;
    }
    this.taskForm.controls['Fk_Owner_Id'].setValue(ownerId);
    this.taskForm.controls['Fk_Project_Id'].setValue(projectId);
    this.taskForm.controls['Id'].setValue(taskId);
    this.prjctService.editTask(this.taskForm.value, taskId)
    .subscribe((data) =>
    {
      this.dialogRef.close();
      this.snackBar.open("Úkol byl úspěšně editován.", null, {duration: 2000});
    }, error =>
    {
      alert("There was problem with creating a task!");
    })
  }
}

export interface AddTaskData {
  name: string;
  description: string;
  projectId: number;
  ownerId: number;
  priority: string;
  labels: string;
}

