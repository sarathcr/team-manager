import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUnlockComponent } from './step-unlock.component';

describe('StepUnlockComponent', () => {
  let component: StepUnlockComponent;
  let fixture: ComponentFixture<StepUnlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepUnlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
