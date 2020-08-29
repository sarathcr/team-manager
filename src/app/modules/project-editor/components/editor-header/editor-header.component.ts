import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Labels } from 'src/app/shared/constants/model/editor-header.model'
import { ProjectTitle } from '../../constants/model/project.model'

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
})
export class EditorHeaderComponent {
  @Input() projectData: ProjectTitle
  @Input() stepOneStatus
  @Input() labels: Labels = {
    structure: 'EXPERIENCE.experience_header_menu_structure',
    activities: 'EXPERIENCE.experience_header_menu_activities',
    evaluation: 'EXPERIENCE.experience_header_menu_evaluation',
    buttonLabel: 'EXPERIENCE.experience_header_menu_programacion',
  }
  @Output() titleSubmit = new EventEmitter()
  modalRef: BsModalRef
  @ViewChild('modalUnlock') modalUnlock: TemplateRef<any>

  constructor(private router: Router, private modalService: BsModalService) {}

  handleTitleSubmit(event: Event): void {
    this.titleSubmit.emit(event)
  }

  onClick(id: number, event: any): void {
    if (this.stepOneStatus === 'DONE') {
      event.currentTarget.querySelector('button').blur()
      this.router.navigate([]).then((result) => {
        window.open('/output/project/' + id, '_blank')
      })
    } else {
      this.modalRef = this.modalService.show(this.modalUnlock, {
        class: 'common-modal modal-dialog-centered',
      })
    }
  }

  declineModal(): void {
    this.modalRef.hide()
  }

  confirmModalUnlock(): void {
    this.modalRef.hide()
  }

  getActiveRoute(): string {
    if (this.router.url.includes('activities')) {
      return 'activities'
    } else {
      return 'editor'
    }
  }
}
