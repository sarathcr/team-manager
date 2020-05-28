import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalProductComponent } from './final-product.component';

describe('FinalProductComponent', () => {
  let component: FinalProductComponent;
  let fixture: ComponentFixture<FinalProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
