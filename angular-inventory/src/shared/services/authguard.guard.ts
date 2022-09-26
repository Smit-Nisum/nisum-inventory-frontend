import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authService: SocialAuthService, private router: Router) {}

  canActivate(nextRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem("APP_TOKEN")) {
      this.router.navigate(['/login-page'])  
      return false;
    }
    return true;
  }
  
}
