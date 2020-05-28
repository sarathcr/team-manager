import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedagogicalGuideComponent } from './pedagogical-guide.component';

describe('PedagogicalGuideComponent', () => {
  let component: PedagogicalGuideComponent;
  let fixture: ComponentFixture<PedagogicalGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedagogicalGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedagogicalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
