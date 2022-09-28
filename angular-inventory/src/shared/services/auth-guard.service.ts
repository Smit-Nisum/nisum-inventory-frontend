import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private readonly _authService: SocialAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let authInfo = {
      authenticated: false,
    };
    console.log(localStorage.getItem('TOKEN'), 'user token');
    if (localStorage.getItem('APP_TOKEN') === 'null') {
      this.router.navigate(['login-page']);
      return false;
    }
    return true;
  }
}
