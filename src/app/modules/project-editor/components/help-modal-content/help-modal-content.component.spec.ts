import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModalContentComponent } from './help-modal-content.component';

describe('HelpModalContentComponent', () => {
  let component: HelpModalContentComponent;
  let fixture: ComponentFixture<HelpModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpModalContentComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
