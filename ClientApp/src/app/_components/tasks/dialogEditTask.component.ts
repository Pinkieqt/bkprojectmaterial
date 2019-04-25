import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AlertComponent } from '../layout/alert/alert.component';
import { TaskService } from 'src/app/_services/task.service';

/*
  Komponent pro editaci úkolu u projektu - dialog

  + interface pro editační data
*/
@Component({
    selector: 'dialog-edit-task',
    templateUrl: './edit-task-dialog.html',
    styleUrls: ['./tasks.component.css']
  })
  export class DialogEditTask 
  {
    
    private tmpTask: EditTaskData;
    private taskForm: FormGroup;
    public labelList: string[] = ['Administrace', 'Web', 'Aplikace'];
    public participientList: string[];
  
    constructor(
      private taskService: TaskService,
      private snackBar: MatSnackBar,
      private router: Router,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogEditTask>,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: EditTaskData) 
      {

        this.participientList = this.data.assigned.split(',');

        this.taskForm = this.formBuilder.group({
          Id: [''],
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
          description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
          Fk_Owner_Id: [''],
          Fk_Project_Id: [''],
          priority: ['', [Validators.required]],
          AssignedString: ['', [Validators.required]],
          LabelsString: ['', [Validators.required]],
        })
      }
  
    onNoClick(): void 
    {
      this.dialogRef.close();
    }
  
    onOkClick(ownerId: number, projectId: number, taskId: number): void 
    {
      if(!this.taskForm.valid)
      {
        this.snackBar.open("Formulář pro editaci úkolu je neplatný.", null, {duration: 2000});
        return;
      }
      this.taskForm.controls['Fk_Owner_Id'].setValue(ownerId);
      this.taskForm.controls['Fk_Project_Id'].setValue(projectId);
      this.taskForm.controls['Id'].setValue(taskId);
      this.taskService.editTask(this.taskForm.value, taskId)
      .subscribe(data =>
      {
        this.dialogRef.close();
        this.snackBar.open("Úkol byl úspěšně editován.", null, {duration: 2000});
      }, error => {
        this.errorHandle(error);
      })
    }
    
    errorHandle(error: any): void
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
  
  export interface EditTaskData {
    name: string;
    description: string;
    projectId: number;
    ownerId: number;
    assigned: string;
    priority: string;
    labels: string;
  }
  
  