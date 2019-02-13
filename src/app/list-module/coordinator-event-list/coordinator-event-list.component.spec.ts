import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorEventListComponent } from './coordinator-event-list.component';

describe('CoordinatorEventListComponent', () => {
  let component: CoordinatorEventListComponent;
  let fixture: ComponentFixture<CoordinatorEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
