import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditorHeaderComponent } from './project-editor-header.component';

describe('ProjectEditorHeaderComponent', () => {
  let component: ProjectEditorHeaderComponent;
  let fixture: ComponentFixture<ProjectEditorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
