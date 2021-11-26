import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPeopleComponent } from './main-people.component';

describe('MainPeopleComponent', () => {
  let component: MainPeopleComponent;
  let fixture: ComponentFixture<MainPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
