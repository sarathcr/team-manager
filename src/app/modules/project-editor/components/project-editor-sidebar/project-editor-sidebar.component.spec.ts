import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditorSidebarComponent } from './project-editor-sidebar.component';

describe('ProjectEditorSidebarComponent', () => {
  let component: ProjectEditorSidebarComponent;
  let fixture: ComponentFixture<ProjectEditorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditorSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
