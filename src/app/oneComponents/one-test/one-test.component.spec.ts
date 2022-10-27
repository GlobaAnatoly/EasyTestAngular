import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTestComponent } from './one-test.component';

describe('OneTestComponent', () => {
  let component: OneTestComponent;
  let fixture: ComponentFixture<OneTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
