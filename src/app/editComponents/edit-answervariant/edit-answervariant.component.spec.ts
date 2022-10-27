import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnswervariantComponent } from './edit-answervariant.component';

describe('EditAnswervariantComponent', () => {
  let component: EditAnswervariantComponent;
  let fixture: ComponentFixture<EditAnswervariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnswervariantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnswervariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
