import { Component, OnInit } from '@angular/core';
//import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  public userList: any[];
  public currentLogin: string;

  constructor(
    )
  {
    //this.currentLogin = localStorage.getItem("log");
  }

  ngOnInit()
  {
      
  }

}
