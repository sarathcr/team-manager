import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSelectorComponent } from './details-selector.component';

describe('DetailsSelectorComponent', () => {
  let component: DetailsSelectorComponent;
  let fixture: ComponentFixture<DetailsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
