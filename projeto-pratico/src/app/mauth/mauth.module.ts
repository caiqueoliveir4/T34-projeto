import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauthRoutingModule } from './mauth-routing.module';
import { LoginComponent } from './view/login/login.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './view/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MauthRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MauthModule { }
