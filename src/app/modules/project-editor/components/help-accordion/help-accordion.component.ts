import { Component, OnInit,  ViewEncapsulation, Input, OnDestroy, ElementRef, AfterViewInit, QueryList, ViewChildren, Renderer2, HostListener} from '@angular/core'
import { Help } from 'src/app/shared/constants/contextual-help.model'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { HelpModalContentComponent } from '../help-modal-content/help-modal-content.component'

@Component({
  selector: 'app-help-accordion',
  templateUrl: './help-accordion.component.html',
  styleUrls: ['./help-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HelpAccordionComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() content: Help[]
  @ViewChildren('accordionBody') accordionBody: QueryList<any>
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.adjustHeight()
  }
  arrayHeight: string = ''
  oneAtATime: boolean = true
  isFirstOpen: boolean = true
  customClass: string = 'help-accordion'
  bsModalRef: BsModalRef

  constructor(
    private modalService: BsModalService,
    private elementRef:ElementRef,
    private renderer:Renderer2
  ) { }

  ngOnInit(): void {
    this.adjustHeight()
  }
  
  ngAfterViewInit() {
      this.elementRef.nativeElement.querySelectorAll('.help-img-thumb').forEach( thumb => {
        this.renderer.listen(thumb, 'click', (event) => { this.openModalWithComponent(event)})
      })
      this.elementRef.nativeElement.querySelectorAll('.help-video-thumb').forEach( thumb => {
        this.renderer.listen(thumb, 'click', (event) => { this.videoModal(event)})
      })
  }

  ngOnDestroy() {
    const modalCount = this.modalService.getModalsCount();
    if (modalCount > 0) {
      this.modalService._hideModal(modalCount)
    }
  }

  videoModal(event) {
      event.preventDefault()
      const element = event.currentTarget
      const title = element.dataset.title
      const url = element.dataset.url
      const type = element.dataset.type
      const initialState = {
        title: title, // Title goes here
        video: true,
        videoSources: {
          src: url,  //'https://youtu.be/f4cstWWgOh0', // 'https://vimeo.com/347119375', // Set video url here
          type: type //this.type, //'video/youtube' 'video/vimeo' 'video/mp4' Set video type here
        }
      };

      this.bsModalRef = this.modalService.show(HelpModalContentComponent, { class: 'help-modal', initialState })
      this.bsModalRef.content.closeBtnName = 'Close'
  }

  openModalWithComponent(event) {
      event.preventDefault()
      const element = event.currentTarget
      const title = element.dataset.title
      const content = element.dataset.content
      const initialState = {
        title: title,
        img: content
      };

      this.bsModalRef = this.modalService.show(HelpModalContentComponent, { class: 'help-modal', initialState })
      this.bsModalRef.content.closeBtnName = 'Close'
  }

  adjustHeight(){
    this.arrayHeight = 'calc(100vh - ' + ((this.content.length * 60) + 160) + 'px)'
  }
}
