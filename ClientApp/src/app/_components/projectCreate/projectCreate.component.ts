import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { UserService } from '../../_services/user.service';

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
  private doesUserWantEmails: boolean;
  private projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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

  saveProject()
  {
    if (!this.projectForm.valid)
    {
      alert("Invalid name of the project!");
      return;
    }
    this.projectForm.controls['Owner_Id'].setValue(this.currentIdOfUser);
    if (this.selectedUserIds.length != 0) this.projectForm.controls['ParticipientsString'].setValue(this.selectedUserIds.toString());
    else this.projectForm.controls['ParticipientsString'].setValue(null);
    this.projectService.saveProject(this.projectForm.value)
      .subscribe((data) =>
      {
        this.router.navigate([""]);
        alert("Project created!");
      }, error =>
      {
        alert("There was problem creating a project.");
      })
  }
  

  getUsers()
  {
    this.userService.getUsers().subscribe(data =>
    {
      this.userList = data;
      for (let entry of this.userList)
      {
        if (entry.id == this.currentIdOfUser)
        {
          this.doesUserWantEmails = entry.getEmails;
          console.log(this.doesUserWantEmails);
          this.userList.splice(this.userList.indexOf(entry), 1);
        }
      }
    })
  }

  moveUser(id: number, where: string)
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
  
  
}
