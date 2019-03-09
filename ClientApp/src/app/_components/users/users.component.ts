import { UserService } from './../../_services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent{
  public userList: any;
  displayedColumns: string[] = ['id', 'login', 'fname', 'lname', 'email', 'role'];

  constructor(private userService: UserService) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    })
  }

  deleteUser(login: string, id: number) {
    if(id == 1){
      alert("You cannot delete user with administrator rights!");
    }
    else
    {
      var confirmAnswer = confirm("Are you sure that you want to delete user with login: " + login);
      if (confirmAnswer) {
        this.userService.deleteUser(login).subscribe((data) => {
          this.getUsers();
        }),
        error => {
          alert("Nemáte práva toto udělat!");
          console.error(error);
        }
      } 
    }
   
  }
  
}

interface UserData {
  id: number;
  login: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}
