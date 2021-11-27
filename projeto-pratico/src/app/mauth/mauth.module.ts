import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauthRoutingModule } from './mauth-routing.module';
import { LoginComponent } from './view/login/login.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MauthRoutingModule,
    MaterialModule
  ]
})
export class MauthModule { }
