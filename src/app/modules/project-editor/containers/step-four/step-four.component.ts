import { ModalComponent } from './../../components/modal/modal.component'
import { Component, OnInit } from '@angular/core'
import { EditorService } from '../../services/editor/editor.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

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
    const initialState = {
      modalConfig: {
        variant: 'information',
        icon: 'lock',
        title: 'PROJECT.project_dependancy_title_cv',
        description: 'CONTENT.project_content_dependancy_filterbycriteria_description',
        redirectTo: '2',
        completeLabel: 'CONTENT.project_content_dependancy_filterbycriteria_button'
      }
    }
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
    this.bsModalRef.content.onClose.subscribe(result => {

    })
  }

}
