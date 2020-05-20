import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectThumbnailComponent } from './project-thumbnail.component';

describe('ProjectThumbnailComponent', () => {
  let component: ProjectThumbnailComponent;
  let fixture: ComponentFixture<ProjectThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
