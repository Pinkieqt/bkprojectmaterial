import { UserService } from './../../_services/user.service';
import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogAddUser } from './addUserDialog.component';
import { DialogEditDialog } from './editUserDialog.component';
import { AlertComponent } from '../layout/alert/alert.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent
{
  private userList: any;
  private displayedColumns: string[] = ['id', 'login', 'fname', 'lname', 'email', 'role','getEmails', 'akce'];


  constructor(
    private userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) {
    this.getUsers();
  }

  //Metoda pro získání uživatelů z databáze
  getUsers(): void 
  {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    }, error => {
      this.errorHandle(error);
    })
  }

  //Metoda pro smazání uživatele z databáze
  deleteUser(login: string, role: number, id: number): void 
  {
    if(role == 1)
    {
      this.dialog.open(AlertComponent, {
        width: '30%'
      });
    }
    else
    {
      var confirmAnswer = confirm("Jste si jistý, že chcete smazat uživatele s přihlašovacím jménem " + login + " a všemi jeho daty (projekty, úkoly)?");
      if (confirmAnswer) 
      {
        this.userService.deleteUser(id).subscribe(res => 
        {
          this.getUsers();
          this.snackBar.open("Uživatel byl úspěšně odebrán i s jeho projekty.", null, {duration: 2000});
        }), error => {
          this.errorHandle(error);
        }
      } 
    }
  }

  //Metoda pro zobrazení dialogu pro přidání uživatele
  openAddUserDialog(): void 
  {
    const dialogRef = this.dialog.open(DialogAddUser, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  //Metoda pro zobrazení editačního dialogu
  openEditDialog(p_fname: string, p_lname: string, p_email: string, p_login: string): void 
  {
    const dialogRef = this.dialog.open(DialogEditDialog, {
      width: '30%',
      data: {fname: p_fname, lname: p_lname, email: p_email, login: p_login}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
  
  errorHandle(error: any): void
  {
    console.log("hey");
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
