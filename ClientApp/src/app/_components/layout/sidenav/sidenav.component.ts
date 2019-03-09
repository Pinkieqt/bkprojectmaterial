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
  constructor( private authService: AuthorizationService, private router: Router )
  {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        this.checkLoginStatus();
      }
    })
  }
  
  otherTheme: boolean = true;
  isLoggedIn: boolean = false;

  checkLoginStatus()
  {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout()
  {
    this.router.navigate(["/login"]);
    this.authService.logout();
  }

  changeTheme()
  {
    this.otherTheme = !this.otherTheme;
  }

  
}
