import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInputTitleComponent } from './project-input-title.component';

describe('ProjectInputTitleComponent', () => {
  let component: ProjectInputTitleComponent;
  let fixture: ComponentFixture<ProjectInputTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInputTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInputTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
