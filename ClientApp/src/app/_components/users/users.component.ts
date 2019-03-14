import { UserService } from './../../_services/user.service';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{
  private userList: any;
  private displayedColumns: string[] = ['id', 'login', 'fname', 'lname', 'email', 'role', 'akce'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
    ) {
    this.getUsers();
  }

  //Metoda pro získání uživatelů z databáze
  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    })
  }

  //Metoda pro smazání uživatele z databáze
  deleteUser(login: string, id: number): void {
    if(id == 1)
    {
      alert("Nelze smazat uživatele s administrátorskými právy!");
    }
    else
    {
      var confirmAnswer = confirm("Jste si jistý, že chcete smazat uživatele s přihlašovacím jménem " + login);
      if (confirmAnswer) 
      {
        this.userService.deleteUser(login).subscribe((data) => 
        {
          this.getUsers();
        }),
        error => 
        {
          alert("Nemáte práva toto udělat!");
          console.error(error);
        }
      } 
    }
  }

  //Metoda pro zobrazení dialogu pro přidání uživatele
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUser, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  //Metoda pro zobrazení editačního dialogu
  openEditDialog(p_fname: string, p_lname: string, p_email: string, p_login: string): void {
    const dialogRef = this.dialog.open(DialogEditDialog, {
      width: '30%',
      data: {fname: p_fname, lname: p_lname, email: p_email, login: p_login}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
}

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