import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpImgThumbComponent } from './help-img-thumb.component';

describe('HelpImgThumbComponent', () => {
  let component: HelpImgThumbComponent;
  let fixture: ComponentFixture<HelpImgThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpImgThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpImgThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
