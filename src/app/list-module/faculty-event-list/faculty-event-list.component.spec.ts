import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyEventListComponent } from './faculty-event-list.component';

describe('FacultyEventListComponent', () => {
  let component: FacultyEventListComponent;
  let fixture: ComponentFixture<FacultyEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
