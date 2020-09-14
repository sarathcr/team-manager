import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'
import { SwitchComponent } from 'src/app/shared/components/switch/switch.component'

import { TranslateModule } from '@ngx-translate/core'
import { MaterialCardComponent } from './material-card.component'

describe('MaterialCardComponent', () => {
  let component: MaterialCardComponent
  let fixture: ComponentFixture<MaterialCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [MaterialCardComponent, SwitchComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCardComponent)
    component = fixture.componentInstance
    component.canDelete = true
    component.draggable = true
    component.showSwitch = true
    component.title = 'Lorem ipsum'
    component.label = 'dolor sic senet'

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain title', () => {
    const title = fixture.debugElement.query(
      By.css('.material-card__title')
    ).nativeElement

    expect(title).toBeTruthy()
  })

  it('should contain label', () => {
    const label = fixture.debugElement.query(
      By.css('.material-card__typename')
    ).nativeElement

    expect(label).toBeTruthy()
  })

  it('should emit on Delete button click', () => {
    let type = null
    component.delete.subscribe((message) => (type = message))
    fixture.detectChanges()

    const button = fixture.debugElement.query(
      By.css('.material-card__close-button')
    ).nativeElement
    button.dispatchEvent(new Event('click'))
    fixture.detectChanges()
  })

  it('should emit on Dragg div click', () => {
    let type = null
    component.dragg.subscribe((message) => (type = message))
    fixture.detectChanges()

    const draggIcon = fixture.debugElement.queryAll(
      By.css('.material-card__icon_draggable')
    )
    draggIcon[0].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()
  })

  it('should emit on Switch change switch', () => {
    let type = null
    component.switch.subscribe((message) => (type = message))
    fixture.detectChanges()

    const switchClick = fixture.debugElement.query(
      By.directive(SwitchComponent)
    ).nativeElement
    switchClick.dispatchEvent(new Event('changeSwitch'))
    fixture.detectChanges()
  })
})
