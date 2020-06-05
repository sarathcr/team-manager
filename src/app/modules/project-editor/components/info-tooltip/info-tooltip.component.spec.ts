import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoToolTipComponent } from './info-tooltip.component';

describe('InfoToolTipComponent', () => {
  let component: InfoToolTipComponent;
  let fixture: ComponentFixture<InfoToolTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoToolTipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoToolTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
