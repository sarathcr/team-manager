import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAccordionComponent } from './help-accordion.component';

describe('HelpAccordionComponent', () => {
  let component: HelpAccordionComponent;
  let fixture: ComponentFixture<HelpAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
