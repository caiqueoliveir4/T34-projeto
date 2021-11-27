import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private autenticaService: AutenticaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credencials = this.loginForm.value;
    this.loading = true;
    this.autenticaService.login(credencials)
    .subscribe(
      user => {
        console.log(user);
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


}
