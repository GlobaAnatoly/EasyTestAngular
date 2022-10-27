import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTeacherComponent } from './one-teacher.component';

describe('OneTeacherComponent', () => {
  let component: OneTeacherComponent;
  let fixture: ComponentFixture<OneTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
