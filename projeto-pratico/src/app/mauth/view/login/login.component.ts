import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  })

  loading = false;

  constructor(
    private autenticaService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const cred = this.loginForm.value;
    this.loading = true;
    this.autenticaService.login(cred.email, cred.password)
    .subscribe(
      user => {
        this.snackBar.open('logged in succcessfuly. welcome' + user.firstName + '!', 'OK', {duration: 3000});
        this.router.navigateByUrl('/');
        this.loading = false;
        
      },
      err => {
        console.log(err);
        this.snackBar.open('login Error', 'OK', {duration: 3000});
        this.loading = false;
      }
    )

  }
}



