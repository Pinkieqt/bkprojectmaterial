import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router, 
    // private helper: JwtHelper
    ) {}

  canActivate() {
    const token = localStorage.getItem("jwt");

    if (token) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
