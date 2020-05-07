import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorHeaderComponent } from './creator-header.component';

describe('CreatorHeaderComponent', () => {
  let component: CreatorHeaderComponent;
  let fixture: ComponentFixture<CreatorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
