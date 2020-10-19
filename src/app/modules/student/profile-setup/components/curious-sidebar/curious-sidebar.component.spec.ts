import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CuriousSidebarComponent } from './curious-sidebar.component'

describe('CuriousSidebarComponent', () => {
  let component: CuriousSidebarComponent
  let fixture: ComponentFixture<CuriousSidebarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CuriousSidebarComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriousSidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
