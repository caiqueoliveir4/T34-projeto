import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPeopleComponent } from './view/main-people/main-people.component';

const routes: Routes = [
  {path: '', redirectTo: 'people'},
  {path: 'people', component: MainPeopleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
