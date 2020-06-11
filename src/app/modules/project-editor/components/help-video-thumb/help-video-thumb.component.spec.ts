import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpVideoThumbComponent } from './help-video-thumb.component';

describe('HelpVideoThumbComponent', () => {
  let component: HelpVideoThumbComponent;
  let fixture: ComponentFixture<HelpVideoThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpVideoThumbComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpVideoThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
