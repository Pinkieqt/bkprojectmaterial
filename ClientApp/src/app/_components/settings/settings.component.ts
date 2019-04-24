import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent
{
  private userList: any = [];
  private userId = parseInt(localStorage.getItem("userId"));
  private gotEmailStatus: boolean = false;
  private emailStatus: boolean;

  constructor( private userService: UserService, private snackBar: MatSnackBar )
  {
    this.getEmailStatus();
  }

  getEmailStatus()
  {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
      for (let entry of this.userList)
      {
        if(this.userId == entry.id)
        {
          this.gotEmailStatus = true;
          return this.emailStatus = entry.getEmails;
        }
      }
      this.gotEmailStatus = false;
    })
  }

  editEmailStatus(event: any)
  {
    let status = event.checked;
    this.userService.editUserEmailStatus({getEmails: status, id: this.userId}).subscribe(result => {
      if(status == false)
        this.snackBar.open("Již nebudete dostávat upozornění v podobě emailu.", null, {duration: 2000});
        
      if(status == true)
        this.snackBar.open("Budete dostávat upozornění v podobě emailu.", null, {duration: 2000});
    }, error => {
      this.snackBar.open("Vyskytla se chyba. Zkuste opakovat svůj požadavek později.", null, {duration: 2000});
    })
  }
}
