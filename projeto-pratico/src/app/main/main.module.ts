import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPeopleComponent } from './view/main-people/main-people.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    MainPeopleComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    
  ]
})
export class MainModule { }
