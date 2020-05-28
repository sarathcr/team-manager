import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaBulletsComponent } from './textarea-bullets.component';

describe('TextareaWithBulletsComponent', () => {
  let component: TextareaBulletsComponent;
  let fixture: ComponentFixture<TextareaBulletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaBulletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
