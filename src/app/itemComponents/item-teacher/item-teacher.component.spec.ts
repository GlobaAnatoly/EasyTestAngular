import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTeacherComponent } from './item-teacher.component';

describe('ItemTeacherComponent', () => {
  let component: ItemTeacherComponent;
  let fixture: ComponentFixture<ItemTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
