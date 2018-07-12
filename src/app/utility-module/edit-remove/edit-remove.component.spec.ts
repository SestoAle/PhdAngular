import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRemoveComponent } from './edit-remove.component';

describe('EditRemoveComponent', () => {
  let component: EditRemoveComponent;
  let fixture: ComponentFixture<EditRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
