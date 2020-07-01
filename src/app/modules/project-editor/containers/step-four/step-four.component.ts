import { Component, OnInit } from '@angular/core'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { EditorService } from '../../services/editor/editor.service'
import { ModalComponent } from './../../components/modal/modal.component'
import { ModalUnlock } from './../../constants/modal-config.data'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit {
  bsModalRef: BsModalRef
  constructor(private editor: EditorService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit(): void {
    this.editor.getStepData(4)
  }

  getModal(): void {
    const initialState = { modalConfig: { ...ModalUnlock } }
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result){
        this.editor.redirectToStep(3)
      }
    })
  }

}
