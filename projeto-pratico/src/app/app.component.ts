import { Component } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { User } from './mauth/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User> = new Observable<User>();
  authenticated$: Observable<boolean> = new Observable<boolean>();
}
