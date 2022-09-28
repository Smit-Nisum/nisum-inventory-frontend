import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(
    private readonly _authService: SocialAuthService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.user = user;
        localStorage.setItem('APP_TOKEN', JSON.stringify(this.user.authToken));
    });

  }



  async signOut(): Promise<void> {
    try {
      await this._authService.signOut();
      localStorage.removeItem('APP_TOKEN');
      this.router.navigate(['/login-page']);
    } catch (error) {
      console.log(error);
    }
  }

}
