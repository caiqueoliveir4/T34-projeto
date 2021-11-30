import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from './../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  formRegister = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    phone: [0, [Validators.required, Validators.minLength(10)]],
    mobilePhone: [0, [Validators.required, Validators.maxLength(11)]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required, Validators.minLength(6)]]

    
  }, {validator: this.verificaSenha})
  states = ['MG', 'RS', 'BA', 'MT', 'SP', 'RJ', 'MA', 'CE', ]
 

  constructor(
    private fb: FormBuilder,
    private autenticaService: AuthService, 
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  verificaSenha(group: FormGroup) {
    if(group){
      const password = group.controls['password'].value;
      const password2 = group.controls['password2'].value;
      if (password == password2) {
        return null;
      }
    }
    return {matchin: false};
}

onSubmit() {

  let u: User = {
    ...this.formRegister.value,
     password: this.formRegister.value.password};
  this.autenticaService.register(u)
  .subscribe(
    (u) => {
      this.snackBar.open('successfuly register. Use  your credentials to sing in'
      , 'OK', {duration: 2000})
      this.router.navigateByUrl('auth/login');
      
    },
    (err) => {
      console.error(err);
      this.snackBar.open(err.error.message, 'OK', {duration: 2000})
      
    }
  )
  
}



}
