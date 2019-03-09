import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    //Form
    private loginForm: FormGroup;

    private authorizedLogin: boolean = true;

    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthorizationService,
      private router: Router,
    ) {}
  
    ngOnInit() {
        this.loginForm = this.formBuilder.group(
        {
            Login: ['', [Validators.required, Validators.maxLength(30)]],
            Password: ['', [Validators.required, Validators.maxLength(32)]]
        })
        //Smazani zbytku z předešlé komunikace
        //this.authService.logout();
    }

    login() 
    {
        if (!this.loginForm.valid) 
        {
            return;
        }
        this.authService.loginUser(this.loginForm.value)
        .subscribe(response => {
            let token = (<any>response).token;
            localStorage.setItem("jwt", token);
            localStorage.setItem("log", this.loginForm.controls['Login'].value);
            this.authorizedLogin = true;
            this.router.navigate([""]);
        }, error => {
            
        console.log(error);
            this.authorizedLogin = false;
            //alert("Invalid username or password.");
        })
    }

}
