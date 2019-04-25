import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';
import { AlertComponent } from '../layout/alert/alert.component';

/*
  Komponent pro editaci uživatele - dialog

  + interface pro editační data
*/
@Component({
    selector: 'dialog-edit-dialog',
    templateUrl: './edit-dialog.html',
    styleUrls: ['./users.component.css']
  })
  export class DialogEditDialog 
  {
    
    private tmpUser: EditDialogData;
  
    constructor(
      private snackBar: MatSnackBar,
      public userService: UserService,
      public dialogRef: MatDialogRef<DialogEditDialog>,
      public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: EditDialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onOkClick(fname: string, lname: string, email: string, login: string): void {
      this.tmpUser = {login: login, first_name: fname, last_name: lname, email: email};
      this.userService.editUserx(this.tmpUser).subscribe(data => {
        if(data == 1){
          this.dialogRef.close();
          this.snackBar.open("Uživatel byl upraven.", null, {duration: 2000});
        }
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
  
  export interface EditDialogData {
    login: string;
    first_name: string;
    last_name: string;
    email: string;
  }