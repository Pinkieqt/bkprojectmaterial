import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

/*
  Komponent pro přidání úkolu k projektu - dialog

  + interface pro editační data
*/
@Component({
    selector: 'dialog-add-task',
    templateUrl: './add-task-dialog.html',
    styleUrls: ['./tasks.component.css']
  })
  export class DialogAddTask {
    
    private tmpTask: AddTaskData;
    private taskForm: FormGroup;
    public labelList: string[] = ['Administrace', 'Web', 'Aplikace'];
    public participientList: string[];
  
    constructor(
      private prjctService: ProjectService,
      private snackBar: MatSnackBar,
      private router: Router,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogAddTask>,
      @Inject(MAT_DIALOG_DATA) public data: AddTaskData) {

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

      console.log(this.taskForm.value);
      this.prjctService.saveTask(this.taskForm.value).subscribe(data => {
        this.dialogRef.close();
        this.router.navigate(["project/tasks/" + projectId + "/" + data]);
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
    assigned: string;
    labels: string;
  }
  