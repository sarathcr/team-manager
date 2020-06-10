import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoThumbComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoThumbComponent;
  let fixture: ComponentFixture<VideoThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoThumbComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
