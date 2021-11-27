import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './mauth/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$!: Observable<User>;
  authenticated$!: Observable<boolean>;
}
