import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { MainSidebarComponent } from './main-sidebar.component'

describe('MainSidebarComponent', () => {
  let component: MainSidebarComponent
  let fixture: ComponentFixture<MainSidebarComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainSidebarComponent],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(MainSidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
