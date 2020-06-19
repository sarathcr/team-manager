import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyModalContentComponent } from './competency-modal-content.component';

describe('CompetencyModalContentComponent', () => {
  let component: CompetencyModalContentComponent;
  let fixture: ComponentFixture<CompetencyModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
