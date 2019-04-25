import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AlertComponent } from '../layout/alert/alert.component';
import { TaskService } from 'src/app/_services/task.service';

/*
  Komponent pro přidání úkolu k projektu - dialog

  + interface pro editační data
*/
@Component({
    selector: 'dialog-add-task',
    templateUrl: './add-task-dialog.html',
    styleUrls: ['./tasks.component.css']
  })
  export class DialogAddTask 
  {
    
    private tmpTask: AddTaskData;
    private taskForm: FormGroup;
    public labelList: string[] = ['Administrace', 'Web', 'Aplikace'];
    public participientList: string[];
  
    constructor(
      private taskService: TaskService,
      private snackBar: MatSnackBar,
      private router: Router,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogAddTask>,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: AddTaskData) 
      {

        this.participientList = this.data.assigned.split(',');

        this.taskForm = this.formBuilder.group({
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
          description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
          Fk_Owner_Id: [''],
          Fk_Project_Id: [''],
          priority: ['', [Validators.required]],
          AssignedString: ['', [Validators.required]],
          LabelsString: ['', [Validators.required]]
        })
      }
  
    onNoClick(): void 
    {
      this.dialogRef.close();
    }
  
    onOkClick(ownerId: number, projectId: number): void 
    {
      if (!this.taskForm.valid) 
      {
        this.snackBar.open("Formulář pro přidání úkolu k projektu je neplatný.", null, {duration: 2000});
        return;
      }
      this.taskForm.controls['Fk_Owner_Id'].setValue(ownerId);
      this.taskForm.controls['Fk_Project_Id'].setValue(projectId);
      this.taskService.saveTask(this.taskForm.value).subscribe(data => 
      {
        this.dialogRef.close();
        this.router.navigate(["project/tasks/" + projectId + "/" + data]);
        this.snackBar.open("Úkol byl vytvořen a přiřazen k projektu.", null, {duration: 2000});
      }, error => 
      {
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
  export interface AddTaskData {
    name: string;
    description: string;
    projectId: number;
    ownerId: number;
    priority: string;
    assigned: string;
    labels: string;
  }
  