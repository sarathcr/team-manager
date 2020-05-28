import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TematicaComponent } from './tematica.component';

describe('TematicaComponent', () => {
  let component: TematicaComponent;
  let fixture: ComponentFixture<TematicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TematicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
