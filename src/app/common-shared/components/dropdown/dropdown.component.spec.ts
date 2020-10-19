import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { DropdownComponent } from './dropdown.component'

describe('ActionsTooltipComponent', (): void => {
  let component: DropdownComponent
  let fixture: ComponentFixture<DropdownComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(DropdownComponent)
    component = fixture.componentInstance
    component.list = [
      {
        icon: 'icon-ic_edit',
        text: 'ACTIVITIES.activities_edit_title',
        action: 'update',
      },
      {
        icon: 'icon-ic_duplicate',
        text: 'ACTIVITIES.activities_duplicate',
        action: 'clone',
      },
      {
        icon: 'icon-ic_delete',
        text: 'ACTIVITIES.activities_delete',
        action: 'delete',
      },
    ]

    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
