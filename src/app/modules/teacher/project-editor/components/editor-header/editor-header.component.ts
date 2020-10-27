import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Labels } from 'src/app/common-shared/constants/model/editor-header.model'
import { environment } from 'src/environments/environment'
import { ProjectTitle } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
})
export class EditorHeaderComponent implements OnInit {
  @Input() projectData: ProjectTitle
  @Input() stepOneStatus
  @Input() labels: Labels = {
    structure: 'EXPERIENCE.experience_header_menu_structure',
    activities: 'EXPERIENCE.experience_header_menu_activities',
    evaluation: 'EXPERIENCE.experience_header_menu_evaluation',
    calendar: 'EXPERIENCE.experience_header_menu_calendar',
    people: 'EXPERIENCE.experience_header_menu_people',
    buttonLabel: 'EXPERIENCE.experience_header_menu_programacion',
  }
  @Output() titleSubmit = new EventEmitter()
  modalRef: BsModalRef
  localExperience: string
  @ViewChild('modalUnlock') modalUnlock: TemplateRef<any>
  @ViewChild('modalSoon') modalSoon: TemplateRef<any>
  env = environment
  soonTitle = ''
  soonDescription = ''

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private editor: EditorService
  ) {}

  ngOnInit(): void {
    this.localExperience = this.editor.getExperienceUrl()
  }

  handleTitleSubmit(event: Event): void {
    this.titleSubmit.emit(event)
  }

  onListClick(type: string, disable: boolean = false): void {
    const routeData =
      type === 'home'
        ? 'experiences'
        : `${this.localExperience}/${this.projectData?.id + type}`
    if (!disable) {
      if (type !== '/calendar') {
        this.editor.navigateClick(`/editor/${routeData}`)
      }
    } else {
      this.openSoonModal(type)
    }
  }

  onClick(id: number, event: any): void {
    if (this.stepOneStatus === 'DONE') {
      event.currentTarget.querySelector('button').blur()
      this.router.navigate([]).then((result) => {
        window.open('/output/' + this.localExperience + '/' + id, '_blank')
      })
    } else {
      this.modalRef = this.modalService.show(this.modalUnlock, {
        class: 'common-modal modal-dialog-centered',
      })
    }
  }

  openSoonModal(type: string): void {
    console.log(type)
    if (type === '/calendar') {
      this.soonTitle = 'COMING_SOON.calendar_comingsoon_title'
      this.soonDescription = 'COMING_SOON.calendar_comingsoon_description'
    } else if (type === '/people') {
      this.soonTitle = 'COMING_SOON.personas_comingsoon_title'
      this.soonDescription = 'COMING_SOON.personas_comingsoon_description'
    } else if (type === '/evaluation') {
      this.soonTitle = 'COMING_SOON.evaluation_comingsoon_title'
      this.soonDescription = 'COMING_SOON.evaluation_comingsoon_description'
    }
    this.modalRef = this.modalService.show(this.modalSoon, {
      class: 'common-modal modal-dialog-centered',
    })
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
    } else if (this.router.url.includes('evaluation')) {
      return 'evaluation'
    } else if (this.router.url.includes('people')) {
      return 'people'
    } else {
      return 'editor'
    }
  }
}
