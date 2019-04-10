import { BugService } from './../../_services/bug.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

/*
  Komponent pro přidání bugu k projektu - dialog
*/
@Component({
    selector: 'dialog-add-bug',
    templateUrl: './add-bug-dialog.html',
    styleUrls: ['./bugs.component.css']
  })
  export class DialogAddBug {
    
    private bugForm: FormGroup;
  
    constructor(
      private date: DatePipe,
      private bugService: BugService,
      private snackBar: MatSnackBar,
      private router: Router,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<DialogAddBug>,
      @Inject(MAT_DIALOG_DATA) public data: AddBugData) {
        this.bugForm = this.formBuilder.group({
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
          description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
          Fk_Owner_Id: [''],
          Fk_Project_Id: [''],
          priority: ['', [Validators.required]],
          label1: [''],
          label2: [''],
          label3: [''],
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
          labels: ['']
        })
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onOkClick(ownerId: number, projectId: number): void {
      
      if (!this.bugForm.valid) {
        this.snackBar.open("Formulář pro přidání bugu k projektu je neplatný.", null, {duration: 2000});
        return;
      }
      this.bugForm.controls['Fk_Owner_Id'].setValue(ownerId);
      this.bugForm.controls['Fk_Project_Id'].setValue(projectId);

      
      this.bugForm.controls['start'].setValue(this.date.transform(this.bugForm.controls['start'].value, 'yyyy-MM-dd'));
      this.bugForm.controls['end'].setValue(this.date.transform(this.bugForm.controls['end'].value, 'yyyy-MM-dd'));

      this.bugService.saveBug(this.bugForm.value).subscribe(data => {
        this.dialogRef.close();
        this.router.navigate(["project/bugs/" + projectId + "/" + data]);
        this.snackBar.open("Bug byl úspěšně vytvořen a přiřazen k projektu.", null, {duration: 2000});
      }, error => {
        alert("Problém při vytváření bugu u projektu.")
      })

      /* další neplati a musí se smazat;*/
      var labels = this.bugForm.controls['label1'].value;


      this.bugForm.controls['labels'].setValue(
        this.bugForm.controls['label1'].value + " s"
      )


      this.bugForm.controls['Fk_Owner_Id'].setValue(ownerId);
      this.bugForm.controls['Fk_Project_Id'].setValue(projectId);
      console.log(this.bugForm.value);
    }
  }
  
  export interface AddBugData {
    name: string;
    description: string;
    projectId: number;
    ownerId: number;
    priority: string;
    labels: string;
    start: Date;
    end: Date;
  }
  