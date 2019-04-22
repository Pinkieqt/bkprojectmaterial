import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  public helper = new JwtHelperService();
  constructor(
    private router: Router, 
    ) {}

  canActivate() {
    const token = localStorage.getItem("jwt");

    if (token && !this.helper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
