import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { By } from '@angular/platform-browser'

import { ButtonComponent } from './../button/button.component'
import { NotFoundComponent } from './not-found.component'

class DummyComponent { }

describe('NotFoundComponent', () => {
  let component: NotFoundComponent
  let fixture: ComponentFixture<NotFoundComponent>
  let location: Location
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
        [
          { path: 'editor/projects', component: DummyComponent}
        ]
      )],
      declarations: [ NotFoundComponent, ButtonComponent ]
    })
    .compileComponents()

    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent)
    component = fixture.componentInstance
    fixture.ngZone.run(() => router.initialNavigation())
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have title value 404', () => {
    const element = fixture.debugElement.query(By.css('.not-found__head')).nativeElement
    expect(element.innerText).toContain('404')
  })

  it('should have app-button component', () => {
    const buttonComponent = fixture.debugElement.query(By.directive(ButtonComponent)).nativeElement
    expect(buttonComponent).toBeTruthy()
  })

  it('should work routerLink when its clicked', fakeAsync(() => {
    fixture.ngZone.run(() => fixture.debugElement.query(By.directive(ButtonComponent)).triggerEventHandler('click', {
      button: 0
    }))
    tick()
    fixture.detectChanges()
    expect(location.path()).toBe('/editor/projects')
  }))
})
