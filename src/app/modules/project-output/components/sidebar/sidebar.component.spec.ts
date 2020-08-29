import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { SidebarComponent } from './sidebar.component'

import { By } from '@angular/platform-browser'

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [TranslateModule.forRoot()],
    })
    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the outline', () => {
    const outline = [
      { title: 'lorem ipsum', items: [{ title: 'lorem ipsum' }] },
      { title: 'lorem ipsum', items: [{ title: 'lorem ipsum' }] },
    ]
    component.outline = outline

    fixture.detectChanges()
    const sidebarItem = fixture.debugElement.queryAll(By.css('.sidebar__item'))

    expect(sidebarItem.length).toBe(2 * outline.length)
  })

  it('should emit anchor event on outline  click', () => {
    spyOn(component.navigateTo, 'emit')
    component.anchorClick(1, 1)

    fixture.detectChanges()

    expect(component.linkId).toBe(1)
    expect(component.navigateTo.emit).toHaveBeenCalledWith(1)
  })
})
