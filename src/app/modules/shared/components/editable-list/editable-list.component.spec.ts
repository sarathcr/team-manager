import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { TranslateModule } from '@ngx-translate/core'
import { BsModalService } from 'ngx-bootstrap/modal'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { TextareaComponent } from 'src/app/common-shared/components/textarea/textarea.component'
import { EditableListComponent } from './editable-list.component'

class BsModalServiceStub {}

describe('EditableListComponent', () => {
  let component: EditableListComponent
  let fixture: ComponentFixture<EditableListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableListComponent, TextareaComponent, ButtonComponent],
      providers: [{ provide: BsModalService, useClass: BsModalServiceStub }],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    fixture = TestBed.createComponent(EditableListComponent)
    component = fixture.componentInstance
    component.list = [
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsum' },
      { id: 3, name: 'lorem ipsum' },
    ]
    component.modalRef = {
      content: null,
      hide: () => {},
      setClass: () => {},
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render all the items in the list and a textarea', () => {
    fixture.detectChanges()

    const itemCount = fixture.debugElement.queryAll(
      By.css('.editable-list__item')
    ).length
    const textareaComponent = fixture.debugElement.query(
      By.directive(TextareaComponent)
    )

    expect(itemCount).toBe(component.list.length)
    expect(textareaComponent).toBeTruthy()
  })

  it('should not show textarea for optional variant initially', () => {
    component.variant = 'optional'
    fixture.detectChanges()

    const textareaComponent = fixture.debugElement.query(
      By.directive(TextareaComponent)
    )

    expect(textareaComponent).toBeFalsy()
  })

  it('should delete an item on delete confirmation and emit the list', () => {
    spyOn(component.deleteItem, 'emit')
    const modalHide = spyOn(component.modalRef, 'hide')
    component.deleteIndex = 1
    component.confirmDeleteModal()

    fixture.detectChanges()

    expect(component.list.length).toBe(2)
    expect(component.deleteItem.emit).toHaveBeenCalledWith(component.list)
    expect(modalHide).toHaveBeenCalled()
  })

  it('should edit the name in the list at specific index and emit the list', () => {
    const sampleName = 'Edited Text'
    const editIndex = 0
    spyOn(component.editItem, 'emit')
    const modalHide = spyOn(component.modalRef, 'hide')
    component.editIndex = editIndex
    component.confirmEditModal(sampleName)

    fixture.detectChanges()

    expect(component.list[editIndex].name).toBe(sampleName)
    expect(component.editItem.emit).toHaveBeenCalledWith(component.list)
    expect(modalHide).toHaveBeenCalled()
  })

  it('should hide the modal on delete decline', () => {
    const modalHide = spyOn(component.modalRef, 'hide')
    component.declineDeleteModal()

    fixture.detectChanges()

    expect(modalHide).toHaveBeenCalled()
  })

  it('should hide the modal on edit decline', () => {
    const modalHide = spyOn(component.modalRef, 'hide')
    component.declineEditModal()

    fixture.detectChanges()

    expect(modalHide).toHaveBeenCalled()
  })

  it('should add the new item to the list on enter click', () => {
    const prevListLength = component.list.length
    spyOn(component.addItem, 'emit')
    fixture.detectChanges()
    component.onAddItem({ id: 4, name: 'lorem ipsum' })

    fixture.detectChanges()

    expect(component.list.length).toBeGreaterThan(prevListLength)
    expect(component.addItem.emit).toHaveBeenCalledWith(component.list)
  })
})
