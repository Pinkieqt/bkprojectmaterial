import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';

/*
  Komponent pro přidání uživatele - dialog

  + interface pro editační data
*/
@Component({
    selector: 'dialog-add-user',
    templateUrl: './add-user-dialog.html',
    styleUrls: ['./users.component.css']
  })
  export class DialogAddUser {
    
    private tmpUser: AddUserDialogData;
    private userForm: FormGroup;
    email = new FormControl('', [Validators.required, Validators.email]);
  
    constructor(
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
      public userService: UserService,
      public dialogRef: MatDialogRef<DialogAddUser>,
      @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData) {
        this.userForm = this.formBuilder.group({
          login: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
          first_name: ['', [Validators.required, Validators.maxLength(30)]],
          last_name: ['', [Validators.required, Validators.maxLength(30)]],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
          role: ['', [Validators.required]]
        })
      }
  
    getErrorMessage(field: string) {
      if(this.userForm.hasError('required', field)) return "Toto pole musí být vyplněno.";
      else if(this.userForm.hasError('minlength', field)) return "Zadaný vstup je příliš krátký.";
      else if(this.userForm.hasError('maxlength', field)) return "Zadaný vstup je příliš dlouhý.";
      else if(this.userForm.hasError('email', field)) return "Zadaná emailová adresa je neplatna.";
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onOkClick(): void {
      if (!this.userForm.valid) {
        this.snackBar.open("Formulář pro vytvoření uživatele je neplatný.", null, {duration: 2000});
        return;
      }
      this.userService.saveUser(this.userForm.value)
        .subscribe((data) => {
          this.dialogRef.close();
          this.snackBar.open("Uživatel byl vytvořen a přidán do databáze.", null, {duration: 2000});
        }, error => {
          alert("Problém při vytváření uživatele.")
        })
    }
  }
  
  export interface AddUserDialogData {
    login: string;
    first_name: string;
    last_name: string;
    email: string;
  }
  