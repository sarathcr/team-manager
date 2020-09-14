import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { DropdownSelectComponent } from './dropdown-select.component'

const selectedList = [
  { id: 1, name: 'lorem ipsum' },
  { id: 2, name: 'lorem ipsum' },
]
describe('DropdownSelectComponent', () => {
  let component: DropdownSelectComponent
  let fixture: ComponentFixture<DropdownSelectComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSelectComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    component.data = [
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsum' },
      { id: 3, name: 'lorem ipsum' },
    ]
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should have radio button for single selection(by default)', () => {
    fixture.detectChanges()
    const radioDropdown = fixture.debugElement.query(
      By.css('.dropdown-select_radio')
    )
    fixture.detectChanges()

    expect(radioDropdown).toBeTruthy()
  })
  it('should have checkbox button for multi selection', () => {
    component.multiSelection = true
    fixture.detectChanges()
    const checkBoxDropdown = fixture.debugElement.query(
      By.css('.dropdown-select_check-box')
    )
    fixture.detectChanges()

    expect(checkBoxDropdown).toBeTruthy()
  })
  it('should show the dropdown list positione at right by default', () => {
    fixture.detectChanges()
    const positionedRight = fixture.debugElement.query(
      By.css('.dropdown-select__position_right')
    )
    fixture.detectChanges()

    expect(positionedRight).toBeTruthy()
  })
  it('should emit on selecting item on single selection', () => {
    component.selectedItems = selectedList
    spyOn(component.dropdownSelect, 'emit')
    component.onItemSelect()

    fixture.detectChanges()

    expect(component.dropdownSelect.emit).toHaveBeenCalledWith(selectedList[0])
  })
  it('should emit on selecting items on multi selection', () => {
    component.multiSelection = true
    component.selectedItems = selectedList
    spyOn(component.dropdownSelect, 'emit')
    component.onItemSelect()

    fixture.detectChanges()

    expect(component.dropdownSelect.emit).toHaveBeenCalledWith(selectedList)
  })
  it('should not emit trying on desceleting items by default  ', () => {
    component.multiSelection = true
    component.selectedItems = selectedList
    spyOn(component.dropdownSelect, 'emit')
    component.onItemDeSelect(selectedList[0])

    fixture.detectChanges()

    expect(component.dropdownSelect.emit).toHaveBeenCalledTimes(0)
  })
  it('should emit on desceleting items , if canDeselect is enabled', () => {
    component.multiSelection = true
    component.canDeselect = true
    component.selectedItems = selectedList
    spyOn(component.dropdownSelect, 'emit')
    component.onItemDeSelect(selectedList[0])

    fixture.detectChanges()

    expect(component.dropdownSelect.emit).toHaveBeenCalledWith(selectedList)
  })
})
