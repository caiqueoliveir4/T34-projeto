import { Component } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { User } from './mauth/model/user';
import { AuthService } from './mauth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User> = new Observable<User>();
  authenticated$: Observable<boolean> = new Observable<boolean>();

  constructor( 
    private authService: AuthService,
    private router: Router
    ) {
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  };


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
