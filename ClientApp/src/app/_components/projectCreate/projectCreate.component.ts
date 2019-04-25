import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { UserService } from '../../_services/user.service';
import { AlertComponent } from '../layout/alert/alert.component';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component(
  {
  selector: 'app-projectCreate',
  templateUrl: './projectCreate.component.html',
  styleUrls: ['./projectCreate.component.css']
  }
)
export class ProjectCreateComponent implements OnInit
{
  public userList: any;
  public tmpUserList: any[] = [];
  public selectedUserIds: number[] = [];
  private informativeString: string = " ";
  private currentIdOfUser: number;
  private projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  )
  {
    this.currentIdOfUser = parseInt(localStorage.getItem("userId"));
    this.projectForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(90)]],
      Owner_Id: [''],
      ParticipientsString: ['']
    })
  }


  ngOnInit(): void
  {
    this.getUsers();
  }

  saveProject(): void
  {
    if (!this.projectForm.valid)
    {
      this.snackBar.open("Byl zadán neplatný název pro projekt!", null, {duration: 2000});
      return;
    }
    this.projectForm.controls['Owner_Id'].setValue(this.currentIdOfUser);
    if (this.selectedUserIds.length != 0) this.projectForm.controls['ParticipientsString'].setValue(this.selectedUserIds.toString());
    else this.projectForm.controls['ParticipientsString'].setValue(null);
    this.projectService.saveProject(this.projectForm.value)
      .subscribe((data) =>
      {
        this.router.navigate(["/"]);
        this.snackBar.open("Projekt byl úspěšně vytvořen.", null, {duration: 2000});
      }, error => {
        this.errorHandle(error);
      })
  }
  

  getUsers(): void
  {
    this.userService.getUsers().subscribe(data =>
    {
      this.userList = data;
      for (let entry of this.userList)
      {
        if (entry.id == this.currentIdOfUser)
        {
          this.userList.splice(this.userList.indexOf(entry), 1);
        }
      }
    })
  }

  moveUser(id: number, where: string): void
  {
    if (where == 'from')
    {
      for (let entry of this.userList)
      {
        if (entry.id == id)
        {
          this.tmpUserList.push(entry);
          this.userList.splice(this.userList.indexOf(entry), 1);
        }
      }
      if (!this.selectedUserIds.includes(id)) this.selectedUserIds.push(id);
    }

    if (where == 'to')
    {
      for (let entry of this.tmpUserList)
      {
        if (entry.id == id)
        {
          this.userList.push(entry);
          this.tmpUserList.splice(this.tmpUserList.indexOf(entry), 1);
        }
      }
      if (this.selectedUserIds.includes(id)) this.selectedUserIds.splice(this.selectedUserIds.indexOf(id), 1);
    }
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
