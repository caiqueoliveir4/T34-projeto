import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { Observable } from 'rxjs';
import { Person } from '../../model/person';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-main-people',
  templateUrl: './main-people.component.html',
  styleUrls: ['./main-people.component.scss']
})
export class MainPeopleComponent implements OnInit {

  people$!: Observable<Person[]>;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople(); 
  }

  addOne() {
    const p: Person ={
      name: faker.name.findName(),
      age: faker.random.number({min: 10, max: 99}),
      email: faker.internet.email(),
      company: faker.company.companyName(),
      country: faker.address.country()

    } 
  }

  generate() {
    for (let i = 0; i < 5; i++) {
      this.addOne();
      
    }
  }


}
