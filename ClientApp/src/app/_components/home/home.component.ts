import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent
{
  public userList: any[];
  private currentLogin: string;
  private currentId: number;

  constructor(
    private userService: UserService,
    )
  {
    //this.currentLogin = localStorage.getItem("log");
  }

}
