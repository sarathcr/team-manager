import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { LoaderComponent } from './loader.component'

describe('LoaderComponent', (): void => {
  let component: LoaderComponent
  let fixture: ComponentFixture<LoaderComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ]
    })
    fixture = TestBed.createComponent(LoaderComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it("should not have block class if variant input prop is absent", (): void => {
    const spinnerElement: DebugElement = fixture.debugElement.query(By.css('.spinner'))

    expect(spinnerElement.classes['block']).toBeUndefined()
  })

  it("should have block class if variant input prop is block", (): void => {
    component.variant = 'block'

    fixture.detectChanges()
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'))

    expect(spinnerElement.classes['block']).toBeTruthy()
  })
})
