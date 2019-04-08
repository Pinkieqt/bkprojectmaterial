import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';

/*
  Komponent pro editaci uživatele - dialog

  + interface pro editační data
*/
@Component({
    selector: 'dialog-edit-dialog',
    templateUrl: './edit-dialog.html',
    styleUrls: ['./users.component.css']
  })
  export class DialogEditDialog {
    
    private tmpUser: EditDialogData;
  
    constructor(
      private snackBar: MatSnackBar,
      public userService: UserService,
      public dialogRef: MatDialogRef<DialogEditDialog>,
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
        alert("Problém při editaci uživatele.")
      })
    }
  }
  
  export interface EditDialogData {
    login: string;
    first_name: string;
    last_name: string;
    email: string;
  }