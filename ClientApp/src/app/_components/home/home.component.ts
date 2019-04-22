import { Component } from '@angular/core';

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

  constructor()
  {
    console.log("teď jsem se vytvořil");
  }

}
