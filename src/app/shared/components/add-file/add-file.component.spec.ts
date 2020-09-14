import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'
import { SwitchComponent } from 'src/app/shared/components/switch/switch.component'

import { TranslateModule } from '@ngx-translate/core'
import { AwsImgUploadService } from '../../services/aws-img-upload/aws-img-upload.service'
import { AddFileComponent } from './add-file.component'

class AwsImgloadServiceStub {}

describe('MaterialCardComponent', () => {
  let component: AddFileComponent
  let fixture: ComponentFixture<AddFileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [AddFileComponent, SwitchComponent],
      providers: [
        { provide: AwsImgUploadService, useClass: AwsImgloadServiceStub },
      ],
    })
    fixture = TestBed.createComponent(AddFileComponent)
    component = fixture.componentInstance
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain title', () => {
    const compiled = fixture.debugElement.query(By.css('.add-file__text'))
    const title = compiled.nativeElement
    expect(title.textContent).toContain(
      'ADD_MATERIAL.material_add_device_title'
    )
  })

  it('should contain label', () => {
    const label = fixture.debugElement.query(By.css('.add-file__option-text'))
      .nativeElement
    expect(label.textContent).toContain('ADD_MATERIAL.material_add_device_or')
  })

  it('should unsubscribe the subscriptions on destroy', (): void => {
    const unsubscription = spyOn(component.subscriptions, 'unsubscribe')
    fixture.destroy()
    expect(unsubscription).toHaveBeenCalled()
  })
})
