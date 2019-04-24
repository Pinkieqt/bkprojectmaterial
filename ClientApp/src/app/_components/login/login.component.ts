import { MatSnackBar } from '@angular/material';
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
    public isLoggingIn: boolean = false;

    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthorizationService,
      private router: Router,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit() {
        this.loginForm = this.formBuilder.group(
        {
            Login: ['', [Validators.required, Validators.maxLength(30)]],
            Password: ['', [Validators.required, Validators.maxLength(32)]]
        })
    }

    login() 
    {
        if (!this.loginForm.valid) 
        {
            this.isLoggingIn = false;
            this.snackBar.open("Pole pro přihlášení nesmí být prázdná.", null, {duration: 2000});
            return;
        }
        this.isLoggingIn = true;
        this.authService.loginUser(this.loginForm.value)
        .subscribe(response => {
            let token = (<any>response).token;
            
            localStorage.setItem("jwt", token);
            localStorage.setItem("log", this.loginForm.controls['Login'].value);
            this.authorizedLogin = true;
            this.router.navigate(["/"]);
        }, error => {
            this.isLoggingIn = false;
            this.snackBar.open("Kombinace přihlašovacího jména a hesla je nesprávná. Zkuste to prosím znovu.", null, {duration: 2000});
            this.authorizedLogin = false;
        })
    }

}
