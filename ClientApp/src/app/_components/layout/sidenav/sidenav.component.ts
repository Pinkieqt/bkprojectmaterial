import { UserService } from './../../../_services/user.service';
import { ProjectService } from './../../../_services/project.service';
import { AuthorizationService } from './../../../_services/auth.service';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent
{
  public projectList: any;
  public sharedProjectList: any[] = [];
  public sharedProjectIds: any;
  public userName: string;

  public otherTheme: boolean = false;
  public isLoggedIn: boolean = false;
  private currentId: number;
  private currentLogin: any;

  constructor(private authService: AuthorizationService, private router: Router, private projectService: ProjectService, private userService: UserService )
  {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        //Při každé změně url se zjistí, jestli je JWT token stále platný
        this.checkLoginStatus();
        if(this.isLoggedIn)
        {
          //Ziskani ID přihlášeného uživatele a jeho projektů
          if(this.currentLogin == undefined || this.currentLogin == null) this.getUserIdAndProjects();
        }
        if (event.url == "/" && this.isLoggedIn)
        {
          this.getProjects();
        }
      }
    })
  }

  //Projekty - ziskani projektu podle userId
  getProjects(): void
  {
    this.projectService.getProjectsByUserId(this.currentId).subscribe((data) =>
    {
      if (data != null) this.projectList = data;
    })
    this.projectService.getProjectsByParticipantUserId(this.currentId).subscribe((data =>
    {
      if (data!= null) this.sharedProjectIds = data;
      if (this.sharedProjectIds instanceof Array)
      {
        for (let entry of this.sharedProjectIds){
          this.projectService.getProjectByItsId(entry.fk_Project_Id).subscribe(data => 
          {
            var isInside: boolean = false;
            for (let project of this.sharedProjectList){
              if(project.id == entry.fk_Project_Id)
                isInside = true;
            }
            if(!isInside)
              this.sharedProjectList.push(data);
          })
        }
      }
    }))
  }


  //Getting user id based on login
  getUserIdAndProjects(): void
  {
    this.userService.getUsers().subscribe(data =>
      {
        var tmpData: any = data;
        this.currentLogin = localStorage.getItem("log");
        for (let entry of tmpData)
        {
          if (entry.login == this.currentLogin)
          {
            this.userName = entry.first_name + " " + entry.last_name;
            localStorage.setItem("userId", entry.id);
            this.currentId = entry.id;

            //Ziskani projektů podle id uživatele
            this.getProjects();

          }
        }
      })
  }

  //Login metody
  checkLoginStatus(): void
  {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn == false)
    {
      this.deleteAllStats();
    }
  }

  logout(): void
  {
    this.deleteAllStats();
    this.router.navigate(["/login"]);
    this.authService.logout();
  }

  deleteAllStats(): void
  {
    this.currentId = null;
    this.currentLogin = null;
    this.projectList = null;
    this.sharedProjectList = [];
  }

  changeTheme(): void
  {
    this.otherTheme = !this.otherTheme;
  }

  
}
