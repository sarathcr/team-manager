import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideQuestionsComponent } from './guide-questions.component';

describe('GuideQuestionsComponent', () => {
  let component: GuideQuestionsComponent;
  let fixture: ComponentFixture<GuideQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
