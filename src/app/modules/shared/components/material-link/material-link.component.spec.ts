import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MaterialLinkComponent } from './material-link.component'

describe('MaterialLinkComponent', () => {
  let component: MaterialLinkComponent
  let fixture: ComponentFixture<MaterialLinkComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialLinkComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialLinkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
