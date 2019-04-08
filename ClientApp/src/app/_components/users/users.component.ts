import { UserService } from './../../_services/user.service';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogAddUser } from './addUserDialog.component';
import { DialogEditDialog } from './editUserDialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{
  private userList: any;
  private displayedColumns: string[] = ['id', 'login', 'fname', 'lname', 'email', 'role','getEmails', 'akce'];

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
