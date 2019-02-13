import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhdComponent } from './add-phd.component';

describe('AddPhdComponent', () => {
  let component: AddPhdComponent;
  let fixture: ComponentFixture<AddPhdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
