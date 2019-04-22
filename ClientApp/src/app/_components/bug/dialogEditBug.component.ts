import { BugService } from './../../_services/bug.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

/*
  Komponent pro editaci bugu u projektu - dialog
*/
@Component({
    selector: 'dialog-edit-bug',
    templateUrl: './edit-bug-dialog.html',
    styleUrls: ['./bugs.component.css']
  })
  export class DialogEditBug {
    
    private bugForm: FormGroup;
    public labelList: string[] = ['Administrace', 'Web', 'Aplikace'];
    public participientList: string[];
  
    constructor(
      private date: DatePipe,
      private bugService: BugService,
      private snackBar: MatSnackBar,
      private router: Router,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogEditBug>,
      @Inject(MAT_DIALOG_DATA) public data: EditBugData) {

        this.participientList = this.data.assigned.split(',');

        this.bugForm = this.formBuilder.group({
          Id: [''],
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
          description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
          Fk_Owner_Id: [''],
          Fk_Project_Id: [''],
          priority: ['', [Validators.required]],
          AssignedString: ['', [Validators.required]],
          start: [''],
          end: ['', [Validators.required]],
          LabelsString: ['', [Validators.required]]
        })
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onOkClick(ownerId: number, projectId: number, bugId: number): void {
      if(!this.bugForm.valid)
      {
        this.snackBar.open("Formulář pro editaci bugu je neplatný.", null, {duration: 2000});
        return;
      }
      this.bugForm.controls['Fk_Owner_Id'].setValue(ownerId);
      this.bugForm.controls['Fk_Project_Id'].setValue(projectId);
      this.bugForm.controls['Id'].setValue(bugId);

      this.bugForm.controls['end'].setValue(this.date.transform(this.bugForm.controls['end'].value, 'yyyy-MM-dd'));

      this.bugService.editBug(this.bugForm.value, bugId).subscribe(data => {
        this.dialogRef.close();
        this.snackBar.open("Bug byl úspěšně editován.", null, {duration: 2000});
      }, error => {
        alert("Vyskytl se problém s vytvářením bugu u projektu.");
      })
    }
  }
  
  export interface EditBugData {
    name: string;
    description: string;
    projectId: number;
    ownerId: number;
    assigned: string;
    priority: string;
    labels: string;
    start: Date;
    end: Date;
  }
  
  