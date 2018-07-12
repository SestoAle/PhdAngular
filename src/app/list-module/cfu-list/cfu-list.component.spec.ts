import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfuListComponent } from './cfu-list.component';

describe('CfuListComponent', () => {
  let component: CfuListComponent;
  let fixture: ComponentFixture<CfuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
