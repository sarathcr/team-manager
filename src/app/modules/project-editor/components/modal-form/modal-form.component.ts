import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core'
import { ModalFormConfig } from '../../constants/modal-form-config.model'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { PlatformLocation } from '@angular/common'
import { Subject, Observable } from 'rxjs'
import { EditorService } from '../../services/editor/editor.service'
import { ProjectTitle } from '../../constants/model/project.model'
import { ButtonSubmitConfig } from 'src/app/shared/constants/data/form-config.data'

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFormComponent implements OnInit {

  @Input() modalConfig: ModalFormConfig
  @Input() projectData: ProjectTitle
  buttonConfig = new ButtonSubmitConfig()
  project$: Observable<any>
  modalInput: any = ''

  public onClose: Subject<string>
  constructor(
    public editor: EditorService,
    public bsModalRef: BsModalRef,
    private location: PlatformLocation
  ) {
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    this.onClose = new Subject()
  }

  public onConfirm(): void {
    this.onClose.next(this.modalConfig.variant)
    this.bsModalRef.hide()
  }

  // Function to trigger the value in the textarea
  onValueChange(value: string): void {

    this.buttonConfig.disabled = false
  }


}
