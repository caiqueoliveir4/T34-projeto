import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauthRoutingModule } from './mauth-routing.module';
import { LoginComponent } from './view/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MauthRoutingModule
  ]
})
export class MauthModule { }
